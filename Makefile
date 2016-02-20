.PHONY: install clean test

install:
	npm install

clean: 
	rm -rf node_modules

test:
	mocha test
