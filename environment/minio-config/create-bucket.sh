#!/bin/sh
/usr/bin/mc config host add myminio http://minio:9000 minio password;
/usr/bin/mc mb -p myminio/mybucket;
/usr/bin/mc policy set download myminio/mybucket;
/usr/bin/mc policy set public myminio/mybucket;
/usr/bin/mc anonymous set download myminio/mybucket;
/usr/bin/mc anonymous set public myminio/mybucket;

exit 0;
