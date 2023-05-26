class Response{

    constructor(response){

        this.success = false;

        this.result = "";

        this.errors = []

        this.res = response
    }

    code( responseCode ){

        this.res.status(responseCode)

        return this

    }

    error(errorMsg){

        this.errors.push(errorMsg)

        this.res.json({

            success : false,

            result : "",

            errors : this.errors
        })

    }

    
    ok( data="" ){

        this.res.json(

            {

                success : true,

                result : data,
    
                errors : ""

                
            }
        )
    }
    
}


module.exports = Response