import { DLink } from "./Manager/DLink.js";
import { Node } from "./Manager/Node.js";
import { Manager } from "./Manager/Manager.js";


export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "Game" });
    }

    // ---------------------------------------------------
    // Phaser lifecycle
    // ---------------------------------------------------

    init() {
        console.log("Game initialized");
    }

    preload() {

        this.load.image('SpaceInvaders', 'assets/kindpng_4810910.png');
    }

    create() {
        console.log("===== Manager Tests Begin =====");

        this.testAddToFront();
        this.testAddToEnd();
        this.testRemove();
        this.testInsertBefore();
        this.testInsertAfter();
        this.testMemoryPooling();
        this.testFind();

        console.log("===== Manager Tests End =====");
    }

    update(time, delta) {
        // Game loop placeholder
    }

    // ---------------------------------------------------
    // Tests (direct ports from Game.cs)
    // ---------------------------------------------------

    testAddToFront() {
        console.log("---- 1) Add To Front ----");

        const man = new Manager(0, 2);

        man.addToFront(Node.Name.Bird, 55);
        man.addToFront(Node.Name.Cat, 66);
        man.addToFront(Node.Name.Dog, 77);
        man.addToFront(Node.Name.Fish, 88);

        man.dump();
    }

    testAddToEnd() {
        console.log("---- 2) Add To End ----");

        const man = new Manager(0, 2);

        man.addToEnd(Node.Name.Bird, 55);
        man.addToEnd(Node.Name.Cat, 66);
        man.addToEnd(Node.Name.Dog, 77);
        man.addToEnd(Node.Name.Fish, 88);

        man.dump();
    }

    testRemove() {
        console.log("---- 3) Remove Test ----");

        const man = new Manager(0, 2);

        const bird = man.addToEnd(Node.Name.Bird, 55);
        const cat = man.addToEnd(Node.Name.Cat, 66);
        const dog = man.addToEnd(Node.Name.Dog, 77);
        const fish = man.addToEnd(Node.Name.Fish, 88);

        console.log("Original:");
        man.dump();

        console.log("Remove middle (Dog):");
        man.remove(dog);
        man.dump();

        console.log("Remove end (Fish):");
        man.remove(fish);
        man.dump();

        console.log("Remove first (Bird):");
        man.remove(bird);
        man.dump();

        console.log("Remove only (Cat):");
        man.remove(cat);
        man.dump();
    }

    testInsertBefore() {
        console.log("---- 4) Insert Before ----");

        const man = new Manager(0, 1);

        const bird = man.addToEnd(Node.Name.Bird, 55);
        const cat = man.addToEnd(Node.Name.Cat, 66);
        man.addToEnd(Node.Name.Dog, 77);

        console.log("Original:");
        man.dump();

        console.log("Add Fish before Cat:");
        man.addBefore(cat, Node.Name.Fish, 88);
        man.dump();

        console.log("Add Worm before Bird:");
        man.addBefore(bird, Node.Name.Worm, 99);
        man.dump();
    }

    testInsertAfter() {
        console.log("---- 5) Insert After ----");

        const man = new Manager(0, 1);

        const bird = man.addToEnd(Node.Name.Bird, 55);
        man.addToEnd(Node.Name.Cat, 66);
        const dog = man.addToEnd(Node.Name.Dog, 77);

        console.log("Original:");
        man.dump();

        console.log("Add Fish after Bird:");
        man.addAfter(bird, Node.Name.Fish, 88);
        man.dump();

        console.log("Add Worm after Dog:");
        man.addAfter(dog, Node.Name.Worm, 99);
        man.dump();
    }

    testMemoryPooling() {
        console.log("---- 6) Memory Pooling ----");

        const man = new Manager(3, 2);

        console.log("Original:");
        man.dump();

        man.addToEnd(Node.Name.Bird, 55);
        man.dump();

        man.addToEnd(Node.Name.Cat, 66);
        man.dump();

        man.addToEnd(Node.Name.Dog, 77);
        man.dump();

        man.addToEnd(Node.Name.Fish, 88);
        man.dump();

        man.remove(man.find(Node.Name.Cat));
        man.dump();

        man.remove(man.find(Node.Name.Bird));
        man.dump();
    }

    testFind() {
        console.log("---- 7) Find ----");

        const man = new Manager(3, 2);

        man.addToEnd(Node.Name.Bird, 55);
        man.addToEnd(Node.Name.Cat, 66);
        man.addToEnd(Node.Name.Dog, 77);
        man.addToEnd(Node.Name.Fish, 88);

        man.dump();

        const dog = man.find(Node.Name.Dog);
        console.log("Found Dog:");
        dog?.dump();

        const fish = man.find(Node.Name.Fish);
        console.log("Found Fish:");
        fish?.dump();
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    // This tells Phaser to start using your Game class defined above
    scene: [Game]
};

// This "turns the key" to start the engine
const game = new Phaser.Game(config);


