// Manager.js
import { DLink } from "./DLink.js";
import { Node } from "./Node.js";

export class Manager {
  constructor(initialNumReserved = 5, deltaGrow = 2) {
    console.assert(initialNumReserved >= 0);
    console.assert(deltaGrow > 0);

    this.mDeltaGrow = deltaGrow;
    this.mNumReserved = 0;
    this.mNumActive = 0;
    this.mTotalNumNodes = 0;

    this.poActive = null;
    this.pActiveEnd = null;
    this.poReserve = null;

    this.privFillReservedPool(initialNumReserved);
  }

  addToFront(name, val) {
    if (this.poReserve === null) {
      this.privFillReservedPool(this.mDeltaGrow);
    }

    const pLink = DLink.RemoveFromFrontSingle(
      { head: { value: this.poReserve } }
    );
    this.poReserve = pLink.pNext;

    this.mNumActive++;
    this.mNumReserved--;

    const pNode = pLink;
    pNode.set(name, val);

    DLink.AddToFront(
      { head: { value: this.poActive }, end: { value: this.pActiveEnd } },
      pNode
    );

    if (pNode.pPrev === null) this.poActive = pNode;
    if (pNode.pNext === null) this.pActiveEnd = pNode;

    return pNode;
  }

  addToEnd(name, val) {
    if (this.poReserve === null) {
      this.privFillReservedPool(this.mDeltaGrow);
    }

    const pLink = DLink.RemoveFromFrontSingle(
      { head: { value: this.poReserve } }
    );
    this.poReserve = pLink.pNext;

    this.mNumActive++;
    this.mNumReserved--;

    const pNode = pLink;
    pNode.set(name, val);

    DLink.AddToEnd(
      { head: { value: this.poActive }, end: { value: this.pActiveEnd } },
      pNode
    );

    if (pNode.pPrev === null) this.poActive = pNode;
    this.pActiveEnd = pNode;

    return pNode;
  }

  addBefore(pTarget, name, val) {
    if (this.poReserve === null) {
      this.privFillReservedPool(this.mDeltaGrow);
    }

    const pLink = DLink.RemoveFromFrontSingle(
      { head: { value: this.poReserve } }
    );
    this.poReserve = pLink.pNext;

    this.mNumActive++;
    this.mNumReserved--;

    const pNode = pLink;
    pNode.set(name, val);

    DLink.AddBeforeNode(
      { head: { value: this.poActive }, end: { value: this.pActiveEnd } },
      pTarget,
      pNode
    );

    if (pNode.pPrev === null) this.poActive = pNode;
    return pNode;
  }

  addAfter(pTarget, name, val) {
    if (this.poReserve === null) {
      this.privFillReservedPool(this.mDeltaGrow);
    }

    const pLink = DLink.RemoveFromFrontSingle(
      { head: { value: this.poReserve } }
    );
    this.poReserve = pLink.pNext;

    this.mNumActive++;
    this.mNumReserved--;

    const pNode = pLink;
    pNode.set(name, val);

    DLink.AddAfterNode(
      { head: { value: this.poActive }, end: { value: this.pActiveEnd } },
      pTarget,
      pNode
    );

    if (pNode.pNext === null) this.pActiveEnd = pNode;
    return pNode;
  }

  remove(pNode) {
    DLink.RemoveNode(
      { head: { value: this.poActive }, end: { value: this.pActiveEnd } },
      pNode
    );

    pNode.wash();

    DLink.AddToFrontSingle(
      { head: { value: this.poReserve } },
      pNode
    );
    this.poReserve = pNode;

    this.mNumActive--;
    this.mNumReserved++;
  }

  find(name) {
    let pNode = this.poActive;
    while (pNode !== null) {
      if (pNode.name === name) return pNode;
      pNode = pNode.pNext;
    }
    return null;
  }

  dump() {
    console.log("****** Manager Begin ******");
    console.log("mDeltaGrow:", this.mDeltaGrow);
    console.log("mTotalNumNodes:", this.mTotalNumNodes);
    console.log("mNumReserved:", this.mNumReserved);
    console.log("mNumActive:", this.mNumActive);

    let pNode = this.poActive;
    console.log("Active List:");
    while (pNode !== null) {
      pNode.dump();
      pNode = pNode.pNext;
    }

    pNode = this.poReserve;
    console.log("Reserve List:");
    while (pNode !== null) {
      pNode.dump();
      pNode = pNode.pNext;
    }

    console.log("****** Manager End ******");
  }

  privFillReservedPool(count) {
    console.assert(count >= 0);

    this.mTotalNumNodes += count;
    this.mNumReserved += count;

    for (let i = 0; i < count; i++) {
      const pNode = this.privCreateNode();
      DLink.AddToFrontSingle(
        { head: { value: this.poReserve } },
        pNode
      );
      this.poReserve = pNode;
    }
  }

  privCreateNode() {
    return new Node(Node.Name.Unitialized, 0);
  }
}
