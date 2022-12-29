//importaciones
import express from "express";
import session from "express-session";
import handlebars from "express-handlebars";
import { dirname } from "path";
import {fileURLToPath} from "url";
import passport from "passport";
import { Strategy as LocalStrategy} from "passport-local";
import bcrypt from 'bcrypt'
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import { userModel } from "./models/user.js";
import {Strategy as TwitterStrategy} from 'passport-twitter'


const mongoUrl = "mongodb+srv://RodrigoHalo:CoderProyecto@coderbackend.fgpchrr.mongodb.net/authDB?retryWrites=true&w=majority"

mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
},(error)=>{
    if(error) return console.log("hubo un error",error)
    console.log("conexion exitosa")
})


const app = express();
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>console.log(`Server listening on port ${PORT}`));


//archivos estaticos
const __dirname = dirname(fileURLToPath(import.meta.url)); //ruta server.js
app.use(express.static(__dirname+"/public"));//ruta carpeta public

//motor de plantilla
//inicializar el motor de plantillas
app.engine(".hbs",handlebars.engine({extname: '.hbs'}));
//ruta de las vistas
app.set("views", __dirname+"/views");
//vinculacion del motor a express
app.set("view engine", ".hbs");

//interpretacion de formato json desde el cliente
app.use(express.json()); //lectura de json desde el cuerpo de la peticion.
app.use(express.urlencoded({extended:true})); //lectura de json desde un metodo post de formulario

//configuracion de la sesion
app.use(session({
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://RodrigoHalo:CoderProyecto@coderbackend.fgpchrr.mongodb.net/sessionDB?retryWrites=true&w=majority"
    }),
    secret:"claveSecreta", //clave de encriptacion de la sesion
    //config para guardar en la memoria del servidor
    resave:false,
    saveUninitialized:false,
}));

app.use(passport.initialize())
app.use(passport.session())
//configuracion de passport
passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser((id,done)=>{
    userModel.findById(id,(err,userFound)=>{
        if(err) return done(err)
        return done(null,userFound)
    })
})

//funcion encriptar contraseña
const createHash = (password)=>{
    const hash = bcrypt.hashSync(password,bcrypt.genSaltSync(10))
    return hash
}


passport.use("signupStrategy",new LocalStrategy(
    {
        passReqToCallback:true,
        usernameField:"email"
    },
    (req,username,password,done)=>{
        //logica para recibir usuario
        userModel.findOne({username:username},(err,userFound)=>{
            if(err) return done(err,null,{message:"hubo un error"})
            if(userFound) return done(null,null,{message:"el user ya existe"})
            //guardamos el usuario en db
            const newUser={
                name:req.body.name,
                username:username,
                password:createHash(password)
            }
            userModel.create(newUser,(error,userCreated)=>{
                if(error) return done(error,null,{message:"error al registrar user"})
                return done(null,userCreated)
            })
        })
    }
))

//strategia twiter
passport.use('twitterLogin',new TwitterStrategy(
    {
        consumerKey:"cRrDW7sYv5q2ieIUMRKk9eKSl",
        consumerSecret:"ZLPGd03qIq0LPjVcgxQmyXRUIOBbChFWPJmwg2RaChN6YqCPvj",
        callbackURL:"http://localhost:8080/auth/twitter/callback"
    },
    (token,accesToken,profile,done)=>{
        userModel.findOne({username:profile.username},(error,userFound)=>{
            if(error) return done(error,null,{message:"hubo un error"})
            if(userFound) return done(null,userFound)
            //guardamos el usuario en db
            const newUser={
                name:profile.displayName,
                username:profile.username,
                password:profile.id
            }
            userModel.create(newUser,(error,userCreated)=>{
                if(error) return done(error,null,{message:"error al registrar user"})
                return done(null,userCreated)
            })
        })
    }
))

//rutas asociadas a las paginas del sitio web
app.get("/",(req,res)=>{
    res.render("home")
});

app.get("/registro",(req,res)=>{
    if(req.session.user || req.isAuthenticated()){
        res.redirect("/perfil")
    }else{
        res.render("signup")
    }
});

app.get("/inicio-sesion",(req,res)=>{
    if(req.session.user || req.isAuthenticated()){
        res.redirect("/perfil")
    }else{
        res.render("login")
    }
});

app.get("/perfil",(req,res)=>{
    if(req.session.user || req.isAuthenticated()){
        res.render("profile")
    }else{
        res.send("<div>Debes <a href='/inicio-sesion'>inciar sesion</a> o <a href='/registro'>registrarte</a></div>")
    }
});

//rutas de autenticacion
app.post("/signup",passport.authenticate("signupStrategy",{
    failureRedirect:"/registro",
    failureMessage:true
}),(req,res)=>{
    res.render("signup",{message:"usuario registrado con exito, vaya a iniciar sesion"})
});

app.post("/login",(req,res)=>{
    if(req.session.user || req.isAuthenticated()){}
    const user = req.body;
    userModel.findOne({username:user.email},(err,userFound)=>{
        if(err) res.send(err)
        if(userFound){
            if(bcrypt.compareSync(user.password,userFound.password)){
                req.session.user = user
                res.redirect("/perfil")
            }else{
                res.render("login",{error:"contraseña incorrecta gil"})
            }
        }else{
            res.render("login",{error:"usuario no registrado en base"})
        }
    })
});

app.get("/login-twitter",passport.authenticate("twitterLogin"))


app.get("/auth/twitter/callback",passport.authenticate("twitterLogin",{
    failureRedirect:"/login",
    failureMessage:true
    }),
    (req,res)=>{
    res.redirect("/perfil")
})
app.get("/logout",(req,res)=>{
    req.logOut(err=>{
        if(err) return res.send("error en cerrar sesion")
        req.session.destroy();
        res.redirect("/")
    }) 
    
});




