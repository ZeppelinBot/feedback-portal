# Structure

## /app
Pages/API endpoints using the Next.js App Router + their direct components that are not used elsewhere

## /src
Everything else, such as reusable components, utility functions, repositories/database access, etc.

# Notes

## next-auth v5

The project uses v5 of next-auth, which is currently in development. See [next-auth PR #7443](https://github.com/nextauthjs/next-auth/pull/7443) for up-to-date documentation and current status.

# Building and publishing for prod

1. Build the production image
```
$ docker build -t zeppelin-feedback-portal -f docker/production/Dockerfile .
```

2. Log in to the container registry (use a personal access token as password)
```
$ docker login ghcr.io -u YOUR_USERNAME_HERE
```

3. Push the built image
```
$ docker push ghcr.io/ZeppelinBot/zeppelin-feedback-portal:latest
```
