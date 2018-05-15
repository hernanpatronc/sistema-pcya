export enum PRIVILEGES {
    PRIV_ALL = -1,
    PRIV_READ = 0,
    PRIV_RW = 1,
}
export class User 
{
    username : string;
    password : string;
    privileges : number;
    alias : string;
    id: string;
    created_at: Date;
    updated_at: Date;
}