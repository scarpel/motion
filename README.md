<p align="center">
  <picture width="100" height="100">
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/scarpel/motion/blob/main/medias/motion-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="https://github.com/scarpel/motion/blob/main/medias/motion-light.png">
    <img alt="Motion" src="https://github.com/scarpel/circles/blob/main/medias/motion-light.png" width="300">
  </picture>
</p>
<p align="center">A study on video streaming. Made using NestJS, NextJS, Tailwind CSS, MongoDB and Docker</p>

## Preview

<p align="center">
  

https://github.com/scarpel/motion/assets/31899092/6408ea43-3d5d-47e2-935d-530b269f724e


</p>

## How to run it

> [!NOTE]  
> Docker is required to run this project

There are two `docker-compose` files, one for development and another for production.

### Development
To run the project in development mode, go to the project's directory and run:

```
docker-compose -f compose.dev.yaml
```

### Production
To run the project in production mode, go to the project's directory and run:

```
docker-compose -f compose.yaml
```

## How to access it
Once the containers have been created, they can be accessed using the URL below:

### Server
```
http://localhost:4000/
```

### Client
```
http://localhost:3000/
```

## Up next
There are several things left to do to improve this projects:

- [ ] Add support for video quality selection
- [ ] Add 'Up next' after a video is finished
- [ ] Add video recommendations

