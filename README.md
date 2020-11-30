# Gendiff [![Maintainability](https://api.codeclimate.com/v1/badges/9edd8f049ba62f844dfe/maintainability)](https://codeclimate.com/github/yuliabeton/frontend-project-lvl2/maintainability) ![CI](https://github.com/yuliabeton/frontend-project-lvl2/workflows/CI/badge.svg)

### CLI compares two configuration files and shows a difference

**Supported formats: JSON, YAML, INI**

### Install
* Clone this repository
* Install NVM and Node.js
* Run these commands
```
$ make install
$ make publish
$ npm link
```
### Usage

<code>gendiff [options] firstConfig secondConfig</code>

**Options:**<br>
<code>  -f, --format [type]  output format (default: "stylish")</code><br>
<code>     -h, --help           display help for command</code>

## Examples

<h4>Comparison of two JSON files</h4>

[![asciicast](https://asciinema.org/a/Bz0TdXxS5xT6fj8mBGIDPCAba.svg)](https://asciinema.org/a/Bz0TdXxS5xT6fj8mBGIDPCAba)

<h4>Comparison of two YAML files</h4>

[![asciicast](https://asciinema.org/a/DQOc3guh7eKnMxth52WeME1ud.svg)](https://asciinema.org/a/DQOc3guh7eKnMxth52WeME1ud)

<h4>Comparison of two INI files</h4>

[![asciicast](https://asciinema.org/a/OwF2GL4FT1mUfQAKk6STeXRFU.svg)](https://asciinema.org/a/OwF2GL4FT1mUfQAKk6STeXRFU)

<h4>Plain format output</h4>

[![asciicast](https://asciinema.org/a/x9rdJh4XS0W3bmVqAFbASBf23.svg)](https://asciinema.org/a/x9rdJh4XS0W3bmVqAFbASBf23)

<h4>JSON format output</h4>

[![asciicast](https://asciinema.org/a/tHcw0TqUOtHPnMMAyaI5wiL5r.svg)](https://asciinema.org/a/tHcw0TqUOtHPnMMAyaI5wiL5r)
