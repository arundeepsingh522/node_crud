const connectToDb= async ()=>{

    try{
        const db = await mongoose.connect(process.env.DB_URI);
        console.log('Database is connected');
    }catch(error)
    {
        console.log('error in connecting db',error);
    }

}

module.exports={connectToDb};