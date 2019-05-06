import {RNSync} from 'rnsync';
import NetInfo from '@react-native-community/netinfo';

const url = 'http://192.168.0.27:5984';

export class DataStore{
    constructor(dbName){
        this.dbUrl = url;
        this.dbName = dbName;
        this.store = new RNSync(this.dbUrl, this.dbName);
        this.store.init();
    }
    async hasConnection(){
        const {type} = await NetInfo.getConnectionInfo();
        return type !== 'none';
    }
    async pull(){
        if(await this.hasConnection()){
            return this.store.replicatePull();
        }
        return false;
    }
    async push(){
        if(await this.hasConnection()){
            return this.store.replicatePush();
        }
        return false;
    }
    async list(){
        await this.pull();
        const docs = await this.store.find({});
        return docs;
    }
    async create(item){
        const doc = await this.store.create(item);
        await this.push();
        return doc;
    }
    async update(doc){
        const newDoc = await this.store.update(doc.id, doc.rev, doc.body);
        await this.push();
        return newDoc;
    }
    async remove(id){
        await this.store.delete(id);
        await this.push();
        return id;
    }
}