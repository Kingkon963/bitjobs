@echo off
setlocal

rem Replace these with your actual Railway PostgreSQL connection details
set PGUSER=postgres
set PGPASSWORD=
set PGHOST=roundhouse.proxy.rlwy.net
set PGPORT=57623
set PGDATABASE=railway

set BACKUP_PATH=%cd%\backup

rem Run pg_dump in a PostgreSQL Docker container
docker run --rm ^
  -e PGUSER=%PGUSER% ^
  -e PGPASSWORD=%PGPASSWORD% ^
  -e PGHOST=%PGHOST% ^
  -e PGPORT=%PGPORT% ^
  -e PGDATABASE=%PGDATABASE% ^
  -v %BACKUP_PATH%:/backup ^
  postgres:latest ^
  pg_dump -Fc -f /backup/railway_backup.dump

echo Backup completed. File saved as %BACKUP_PATH%