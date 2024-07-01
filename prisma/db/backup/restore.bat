@echo off
setlocal

rem Replace these with your target PostgreSQL connection details
set PGUSER=postgres
set PGPASSWORD=XujKjTiiVPfkShEdKsxlLXcjZhNiZHvF
set PGHOST=monorail.proxy.rlwy.net
set PGPORT=30102
set PGDATABASE=railway

rem Set the backup file path
set BACKUP_PATH=%cd%\backup

rem Run pg_restore in a PostgreSQL Docker container
docker run --rm ^
  -e PGUSER=%PGUSER% ^
  -e PGPASSWORD=%PGPASSWORD% ^
  -e PGHOST=%PGHOST% ^
  -e PGPORT=%PGPORT% ^
  -e PGDATABASE=%PGDATABASE% ^
  -v %BACKUP_PATH%:/backup ^
  postgres:latest ^
  pg_restore -d %PGDATABASE% /backup/railway_backup.dump

echo Restore completed.