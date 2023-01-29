#! /bin/sh

alias deit="docker exec -it";
#docker-compose up -d &&
  deit sqlserver sh -c "wget https://github.com/Microsoft/sql-server-samples/releases/download/adventureworks/AdventureWorks2019.bak -O /tmp/backup.bak" &&
  deit sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P @1234567890Developer -Q 'RESTORE FILELISTONLY FROM disk="/tmp/backup.bak"' &&
  deit sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P @1234567890Developer -Q 'RESTORE DATABASE AdventureWorks2017 FROM DISK = "/tmp/backup.bak" With Move "AdventureWorks2017" To "/opt/backup.mdf", Move "AdventureWorks2017_log" To "/opt/log.ldf", REPLACE';
