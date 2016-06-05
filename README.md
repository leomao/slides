# Slides

A template for creating reveal.js slides.

A big thanks to [bobogei81123](https://github.com/bobogei81123)!

## Usage

```console
$ git clone --depth=1 --recursive https://github.com/leomao/slides.git <name>
$ cd <name>
$ npm install
$ gulp
```

View the slides at `localhost:3000`.

## Troubleshooting
### Can't push into another repository
Some references:
- http://stackoverflow.com/questions/11375070/pushing-to-github-after-a-shallow-clone
- http://stackoverflow.com/questions/6900103/why-cant-i-push-from-a-shallow-clone 
- http://stackoverflow.com/questions/28983842/remote-rejected-shallow-update-not-allowed-after-changing-git-remote-url

To push this into another repository, you may need to:

```console
$ git fetch --unshallow origin
```

or

```console
$ git checkout --orphan <new_branch>
$ git push <upstream> <new_branch>
```
