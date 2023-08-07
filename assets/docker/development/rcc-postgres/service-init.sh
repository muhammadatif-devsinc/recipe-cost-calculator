#!/bin/bash

db_name=$(echo $RCC_TYPEORM_DATABASE)
db_user=$(echo $RCC_TYPEORM_USERNAME)
db_pass=$(echo $RCC_TYPEORM_PASSWORD)

psql -v --username 'postgres' --dbname 'postgres' ON_ERROR_STOP=1 \
cat <<-EOSQL
  CREATE DATABASE $db_name;
  CREATE ROLE $db_user;
  ALTER ROLE $db_user WITH LOGIN;
  ALTER ROLE $db_user WITH PASSWORD '$db_pass';
  ALTER DATABASE $db_name OWNER TO $db_user;
EOSQL
