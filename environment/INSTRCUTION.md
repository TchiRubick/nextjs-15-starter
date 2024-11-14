# Docker

## Clean everything

### shutdown docker

```bash
docker-compose down
```

### get all containers

```bash
docker ps -a
```

### remove all containers

```bash
docker rm `container` `container` ...
```

### Get all images

```bash
docker images -a
```

### remove all images

```bash
docker rmi `images` `images` ...
```

### Prune Images

```bash
docker image prune
```

### get all volumes

```bash
docker volume ls
```

### remove all volumes

```bash
docker volume rm `volume` `volume` ...
```

## In case the volumes cannot be removed

```bash
sudo rm -r minio_data
sudo rm -r postgres_data
```
## In case `createbuckets` failed to start

```bash
chmod +x minio-config/create-bucket.sh
```
