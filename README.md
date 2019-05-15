
> Cypress + Docker + CircleCI 

Running your Cypress E2E tests on Circle CI v2.0 is very simple.
See [circle.yml](.circleci/circle.yml) for the current build commands.
You can use our base image
[cypress/base](https://hub.docker.com/r/cypress/base/) with all
dependencies pre-installed.

Then check out the code and call `cypress run` command. That is it!


**Note:** if you want to use CircleCI [Workflows feature][workflows] to run
multiple tests in parallel, check out our example repo
[cypress-example-docker-circle-workflows][workflows-repo].

[workflows]: https://circleci.com/docs/2.0/workflows/
[workflows-repo]: https://github.com/cypress-io/cypress-example-docker-circle-workflows

## Artifacts

You can save generated videos and screenshots as CircleCI artifacts

```yaml
steps:
  - checkout
  - run:
      name: Running E2E tests
      command: cypress run
  - store_artifacts:
      path: cypress/videos
  - store_artifacts:
      path: cypress/screenshots
```