const DB_URL="localhost";
const DB_USER="SA";
const DB_PASS="@1234567890Developer"

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var config = {
    server: `${DB_URL}`,
    options: {
        database: 'AdventureWorks2017',
        trustServerCertificate: true
    },
    authentication: {
        type: "default",
        options: {  
            userName: `${DB_USER}`,
            password: `${DB_PASS}`,
        }
    }
};

var connection = new Connection(config);

// Setup event handler when the connection is established. 
connection.on('connect', async function(err) {
    if(err) {
        console.log('Error: ', err)
        return;
    }

    try{
        console.log('connected !')
        executeStatement(
        `select table_name from AdventureWorks2017.information_schema.tables`
        );
    }
    catch(e){
        console.log(e)
    }
    // criar http server
});

// Initialize the connection.
connection.connect();

function executeStatement(sql) {
    const request = new Request(`${sql}`, (err, rowCount) => {
        if (err) {
            throw err;
        }

        console.log('DONE!');
        connection.close();
    });

    // Emits a 'DoneInProc' event when completed.
    request.on('row', (columns) => {
        columns.forEach((column) => {
            if (column.value === null) {
                console.log('NULL');
            } else {
                console.log(column.value);
            }
        });
    });

    request.on('done', (rowCount) => {
        console.log('Done is called!');
    });

    request.on('doneInProc', (rowCount, more) => {
        console.log(rowCount + ' rows returned');
    });

    // In SQL Server 2000 you may need: connection.execSqlBatch(request);
    connection.execSql(request);
}

