class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    addBook(nombre, autor){
        const newBook = {nombre: nombre, autor: autor}
        this.libros.push(newBook)
        console.log(this.libros)
    }
    getBooks(){
        const nombreLibros = this.libros.map(element => element.nombre);
        console.log(nombreLibros)
    }

    getFullName(){
        return this.nombre + this.apellido;
    }
    countMascotas(){
        const cantidadMascotas = this.mascotas.length;
        console.log(cantidadMascotas)
    }
    addMascotas(nombre){
        const newMascota = nombre
        this.mascotas.push(newMascota)
        console.log(this.mascotas)

    }
    
}

const usuario1 = new Usuario("Rodrigo", "Alday", [{nombre:"cosmos", autor:"RBA"},{nombre:"wanda", autor:"RtA"}], ["chipi", "gali"])

usuario1.getBooks()
usuario1.countMascotas()
console.log(usuario1.getFullName())
usuario1.addBook("titanic","marica")
usuario1.addMascotas("felipe")
