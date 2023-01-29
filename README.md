# Restaurando banco de dados
- Primeiro baixar o backup do AdventureWorks2019
- adicionar na pasta de origem
- Após *executar SQL SERVER* rodar comando ```sql
RESTORE FILELISTONLY
FROM disk= '/home/backup.bak'

RESTORE DATABASE AdventureWorks2017
FROM DISK = '/home/backup.bak'
With Move 'AdventureWorks2017' To '/opt/backup.mdf', 
Move 'AdventureWorks2017_log' To '/opt/log.ldf',
REPLACE
```

# Rodando SQL SERVER
Rodar comando do docker:
> `docker run --rm -itd --name mssql -v data:/var/opt/mssql -v $PWD/backup/AdventureWorks2019.bak:/home/backup.bak -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=@1234567890Developer" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest`

