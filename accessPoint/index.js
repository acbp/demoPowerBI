const DB_URL="172.17.0.2"
const DB_USER="sa";
const DB_PASS="@1234567890Developer"

var node_mssql = require('node-mssql');
var queryObj = new node_mssql.Query({
    host: '0.0.0.0',	 // You can use 'x.x.x.x\\instance' to connect to named instance
    port: 1433,
    username: 'sa',
    password: '@1234567890Develop',
    database: 'master'
});

queryObj.table('dbo.mytable');
return;
var Connection = require('tedious').Connection;

var config = {
  server: `${DB_URL}`,
  options: {},
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
connection.on('connect', function(err) {
  if(err) {
    console.log('Error: ', err)
    return;
  }
  // If no error, then good to go...
  executeStatement();
  // criar http server
});

// Initialize the connection.
connection.connect();

function executeStatement() {
  const request = new Request('select * from MyTable', (err, rowCount) => {
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

