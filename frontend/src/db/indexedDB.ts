
import { openDB } from "idb";

export const dbPromise = await openDB("epub-creator", 1, {
  upgrade(db) {

    db.createObjectStore("books",{
      keyPath:"id"
    });

    const chapters = db.createObjectStore("chapters",{
      keyPath:"id"
    })
    chapters.createIndex("bookId", "bookId")
   
  },
});


export async function createBook(title: string, author: string){
  const db = await dbPromise

  const book = {
    id: crypto.randomUUID(),
    title,
    author,
    language: "en",
    createdAt: Date.now(),
  }

  await db.add("books", book)
}

export async function createChapter(bookId:string, title:string){
  const db = await dbPromise

  const chapter = {
    id: crypto.randomUUID(),
    bookId,
    title,
    lexicalState:{}
  }

  await db.add("chapters", chapter)
}


export async function getChapters(bookId){
  const db = await dbPromise

  const index = db
    .transaction("chapters")
    .store
    .index("bookId")

  return await index.getAll(bookId)
}

export async function getChapter(id){
  const db = await dbPromise

  return db.get("chapters",id)
}


export async function saveChapter(id, lexicalState){
  const db = await dbPromise

  const chapter = await db.get("chapters", id)
  chapter.lexicalState = lexicalState

  await db.put("chapters", chapter)
}

export async function getBooks(){
  const db = await dbPromise
  return db.getAll("books")
}
