SELECT 'CREATE DATABASE `test-db`'
WHERE NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'test-db')\gexec;