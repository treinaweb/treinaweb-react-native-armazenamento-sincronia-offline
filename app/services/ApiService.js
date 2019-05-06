import {RNSync} from 'rnsync';

const url = 'http://192.168.0.27:5984';

export class DataStore{
    constructor(dbName){
        this.dbUrl = url;
        this.dbName = dbName;
        this.store = new RNSync(this.dbUrl, this.dbName);
        this.store.init();
    }
    async list(){
        const docs = await this.store.find({});
        return docs;
    }
    async create(item){
        const doc = await this.store.create(item);
        return doc;
    }
    async update(doc){
        const newDoc = await this.store.update(doc.id, doc.rev, doc.body);
        return newDoc;
    }
    async remove(id){
        await this.store.delete(id);
        return id;
    }
}