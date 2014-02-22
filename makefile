.PHONY: all
all: clean build

.PHONY: clean
clean:
	rm -rf ext/* ext
	
.PHONY: build
build:
	mkdir -p ext
	zip -x \*.swp ext -r ext/sleepy-owlet.nw index.html package.json js/*
