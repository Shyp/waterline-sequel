.PHONY: install clean test

circle-install:
	curl --remote-name https://raw.githubusercontent.com/Shyp/set-node-npm/master/set-node-npm
	chmod +x set-node-npm
	./set-node-npm


install:
	npm install

clean: 
	rm -rf node_modules

test:
	./node_modules/.bin/mocha test
