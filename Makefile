install: install-deps

install-deps:
	npm install

build:
	rm -rf dist
	npm run build

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test

gendiff:
	npx babel-node src/bin/gendiff.js

test:
	npm run test