const mysql2 = require('mysql2')

const DBSevice = (options)=>{
    const table = options?.table

    const connection = mysql2.createConnection({
        host:'localhost',
        user:'root',
        database:'searchCNPJ'
    })

    //Table

    const createTable = (body)=>{
        //body.unshift("id int auto_increment")
        body.push("primary key(cnpj)")
        const columns = body.toString()

        return new Promise((res,rej)=>{
            connection.query(`create table ${table}(${columns})`,(error,result)=>{

                if(error) return rej(error)

                return res(result)
            })
        })
    }

    const descTable = ()=>{
        return new Promise((res,rej)=>{
            connection.query(`desc ${table}`,(error,result)=>{
                if(error) return rej(error)

                return res(result)
            })
        })
    }

    const alterTableRenameTo = (body)=>{
        return new Promise((res,rej)=>{
            connection.query(`alter table ${table} rename to ${body.table}`,(error,result)=>{
                if(error) return rej(error)

                return res(result)
            })
        })
    }

    const dropTable = ()=>{
        return new Promise((res,rej)=>{
            connection.query(`drop table ${table}`,(error,result)=>{

                if(error) return rej(error)

                return res(result)
            })
        })
    }

    //Columns

    const alterTableAddColumn = (body)=>{
        const column = body.column
        const position = (!body.position?'':body.position)
        const of = (!body.of?'':body.of)

        return new Promise((res,rej)=>{
            connection.query(`alter table ${table} add column ${column} ${position} ${of}`,(error,result)=>{

                if(error)
                {
                    return rej(error)
                }

                return res(result)
            })
        })
        
    }

    const alterTableForeignKey = (body)=>{
        const newBody = {...body,field:'cnpj'}
        const column = newBody.foreignKey
        const references = newBody.tableReferences
        const field = newBody.field

        return new Promise((res,rej)=>{
            connection.query(`alter table ${table} add foreign key(${column}) references ${references}(${field})`,
            (error,result)=>{

                if(error)
                {
                    return rej(error)
                }

                return res(result)
            })
        })
    }

    const createColumnForForeignKey = (body)=>{
        console.log('body:',body)
        const foreignKey = body.column.replace(" int","")
        const newBody = {...body,foreignKey}
        console.log('newBody:',newBody)
        let resultAddColumn;
        let resultTableForeignKey;

        return new Promise(async(res,rej)=>{
            const addColumn = await alterTableAddColumn(body)
            .then((x)=>{
                resultAddColumn = true
                return x
            })
            .catch((error)=>{
                resultAddColumn = false
                return error
            })

            if(!resultAddColumn) return rej(addColumn)

            if(resultAddColumn) {

                const tableForeignKey = await alterTableForeignKey(newBody)
                .then((x)=>{
                    resultTableForeignKey = true
                    return x
                })
                .catch((error)=>{
                    resultTableForeignKey = false
                    return error
                })

                if(!resultTableForeignKey) return rej(tableForeignKey)

                return res(tableForeignKey)
                
            }
            
        })
        
    }

    const modifyColumn = (body)=>{
        return new Promise((res,rej)=>{
            connection.query(`alter table ${table} modify column ${body.column}`,(error,result)=>{
                if(error) return rej(error)

                return res(result)
            })
        })
    }

    const changeColumn = (body)=>{
        return new Promise((res,rej)=>{
            connection.query(`alter table ${table} change column ${body.column} ${body.to}`,
            (error,result)=>{
                if(error) return rej(error)

                return res(result)
            })
        })
    }

    const dropColumn = (body)=>{
        return new Promise((res,rej)=>{
            connection.query(`alter table ${table} drop column ${body.column}`,
            (error,result)=>{

                if(error) return rej(error)

                return res(result)
            })
        })
    }

    //Values

    const selectAll = (body=null)=>{
        let query;
        const columns = (!body || !body.columns?"*":body.columns.toString())
        return new Promise((res,rej)=>{
            if(body && body.where){
                query = `select ${columns} from ${table} where ${body.where.column}="${body.where.value}" order by ${options.orderBy}`
            }else{
                query = `select ${columns} from ${table} order by ${options.orderBy}`
            }

            connection.query(query,(error,result)=>{
                if(error)
                {
                    return rej(error)
                    
                }
    
                return res(result)
            })
        }) 
        
    }

    const insert = (body)=>{
        const columns = body.columns
        const setColumns = columns.toString()
        const values = body.values
        let columnsLength = columns.length

        return new Promise((res,rej)=>{
            let setValues = '?'
            let count = 1
            let typeInsert;

            if(columns.length === 1){
                typeInsert = 'simple'
                count = 0
            }
            
            columns.forEach(()=>{
                count++
                if(typeInsert !== 'simple') setValues = `?,${setValues}`
                
                if(columnsLength === count){
                    
                    connection.query(`insert into ${table}(${setColumns})values(${setValues})`,
                    values,(error,result)=>{

                        if(error)
                        {
                            return rej(error)
                        }
        
                        return res(result)
                    })
                }
                
            })
            
        })
        
    }

    const deleteItem = (id)=>{
        return new Promise((res,rej)=>{
            connection.query(`delete from ${table} where id=${id}`,
            (error,result)=>{

                if(error) return rej(error)
    
                return res(result)
            })
        })
    }

    const selectOne = (id)=>{
        return new Promise((res,rej)=>{
            connection.query(`select * from ${table} where id=${id}`,
            (error,result)=>{

                if(error) return rej(error)
    
                return res(result)
            })
        })
    }

    const updateTableForeignKey = (body,id)=>{
        const foreignKey = body.column
        const idReference = body.id

        return new Promise((res,rej)=>{
            connection.query(`update ${table} set ${foreignKey} = '${idReference}' where id ='${id}'`,
            (error,result)=>{

                if(error) return rej(error)
    
                return res(result)
            })
        })
        
    }

    const updateChange = (body,id)=>{
        const columns = body.columns
        const values = body.values

        return new Promise((res,rej)=>{
            let fields = []
            let string;

            for(let i=0; i < columns.length; ++i){
                string = `${columns[i]}='${values[i]}'`

                fields.push(string)

                const fieldsString = fields.toString()

                if(fields.length == columns.length){
            
                    connection.query(`update ${table} set ${fieldsString} where id=${id}`,
                    (error,result)=>{

                        if(error) return rej(error)

                        return res(result)
                    })
                }
            }
        })
    }

    const selectJoin = (body,table1,table2=null)=>{
        return new Promise((res,rej)=>{
            let query;
            let newBody = (!body.columns?'*':body.columns.toString())
            console.log('newBody: ',newBody)

            if(newBody != "*"){
                
                if(!table2){
                    query = `select ${newBody} from ${table} join ${table1} 
                    on ${table}.${body.foreignkey}=${table1}.id${(!body.orderBy?"":" order by "+body.orderBy)}`
                    console.log('query1 simple table: ',query)

                }else{
                    query = `select ${newBody} from ${table1} join ${table} 
                    on ${table1}.id=${table}.${body.foreignkey} join ${table2} 
                    on ${table}.${body.foreignkey2} = ${table2}.id${(!body.orderBy?"":" order by "+body.orderBy)}`
                    console.log('query2 multiple table: ',query)
                }
                
            }else{
                
                if(!table2){
                    query = `select ${newBody} from ${table} join ${table1} 
                    on ${table}.${body.foreignkey}=${table1}.id${(!body.orderBy?"":" order by "+body.orderBy)}`
                    console.log('queryAll simple table: ',query)

                }else{
                    query = `select ${newBody} from ${table1} join ${table} 
                    on ${table1}.id=${table}.${body.foreignkey} join ${table2} 
                    on ${table}.${body.foreignkey2} = ${table2}.id${(!body.orderBy?"":" order by "+body.orderBy)}`
                    console.log('queryAll multiple table: ',query)
                }

            }

            connection.query(`${query}`,
            (error,result)=>{
                if(error) return rej(error)

                return res(result)
            })
            
        })
    }

    return {
        createTable,
        descTable,
        alterTableRenameTo,
        dropTable,
        alterTableAddColumn,
        alterTableForeignKey,
        createColumnForForeignKey,
        modifyColumn,
        changeColumn,
        dropColumn,
        selectAll,
        insert,
        deleteItem,
        selectOne,
        updateTableForeignKey,
        updateChange,
        selectJoin,
        connection
    }
}

module.exports = DBSevice