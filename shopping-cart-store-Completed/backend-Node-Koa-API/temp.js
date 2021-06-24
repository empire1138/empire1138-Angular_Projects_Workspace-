router.post('/postTest', async ctx => {
    try{
        const [number] = await ctx.state.db.query(`
        INSERT INTO posttesttable (number) VALUES (:number), 
        {number: ctx.params.number}
        `) 
    }catch (err){

    }
 }) 