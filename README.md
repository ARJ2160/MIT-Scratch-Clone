# MIT SCRATCH CLONE

## ✨ Whats New

1. Able to delete edges and nodes
2. Integrated a central store for managing nodes and edges
3. Fixed Synchronous execution of all blocks
4. Added a play button on input nodes to execute block

## HOW TO USE

1. Drag and drop any 2 or more blocks from the list into the Middle area
2. Connect the blocks using "Edges" from the inlets and outlets of each node.
3. Click the green flag to execute the program
4. Click the red flag to reset all styles
5. For eg. drag and drop the 'When flag clicked and 'Turn 15 degrees' blocks and hit the green flag

<p align="center">
    <img src="https://ik.imagekit.io/36athv2v82c8/Screenshot_2023-06-27_093058_lUPUdLxz2.png?updatedAt=1687838475015" />
</p>

## KNOWN ISSUES

1. ~~ ~~Pairing different blocks from different sections which require input has trouble working synchronously.~~ ~~
2. ~~ ~~Pairing up the 'go to X Y block' with a display message block gives an error.~~ ~~
3. The "When this sprite is clicked" block doesn't work as of now. Need to add a custom node component that has an onClick listener which triggers program execution.
4. ~~ ~~Control blocks have problems following synchronous behavior with other blocks~~ ~~
5. ~~ ~~Can't Delete Nodes~~ ~~
6. ~~ ~~Can't Delete Edges~~ ~~
7. Individual execution of code blocks isnt working right now.

## Initial Setup done with -

```sh
 pnpm create vite@latest
```

## 🛠 Installation & Set Up

1. Install dependencies using pnpm

```sh
pnpm i
```

2. Start the development server

```sh
pnpm dev
```

## 🚀 Building and Running for Production

1. Generate production build

```sh
pnpm build
```
