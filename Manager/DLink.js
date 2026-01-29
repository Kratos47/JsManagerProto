// DLink.js
export class DLink {
  constructor() {
    this.clear();
  }

  // ------------------------------------------------------------
  // Clear()
  // ------------------------------------------------------------
  clear() {
    this.pNext = null;
    this.pPrev = null;
  }

  // ------------------------------------------------------------
  // AddToFront(ref DLink pHead, ref DLink pEnd, DLink pNode)
  // ------------------------------------------------------------
  static AddToFront(refs, pNode) {
    const { head, end } = refs;
    console.assert(pNode !== null);

    if (head.value === null) {
      head.value = pNode;
      end.value = pNode;
      pNode.pNext = null;
      pNode.pPrev = null;
    } else {
      pNode.pPrev = null;
      pNode.pNext = head.value;
      head.value.pPrev = pNode;
      head.value = pNode;
    }

    console.assert(head.value !== null);
    console.assert(end.value !== null);
  }

  // ------------------------------------------------------------
  // AddToFront(ref DLink pHead, DLink pNode)
  // ------------------------------------------------------------
  static AddToFrontSingle(refs, pNode) {
    const { head } = refs;
    console.assert(pNode !== null);

    if (head.value === null) {
      head.value = pNode;
      pNode.pNext = null;
      pNode.pPrev = null;
    } else {
      pNode.pPrev = null;
      pNode.pNext = head.value;
      head.value.pPrev = pNode;
      head.value = pNode;
    }

    console.assert(head.value !== null);
  }

  // ------------------------------------------------------------
  // AddToEnd(ref DLink pHead, ref DLink pEnd, DLink pNode)
  // ------------------------------------------------------------
  static AddToEnd(refs, pNode) {
    const { head, end } = refs;
    console.assert(pNode !== null);

    if (end.value === null) {
      head.value = pNode;
      end.value = pNode;
      pNode.pNext = null;
      pNode.pPrev = null;
    } else {
      end.value.pNext = pNode;
      pNode.pPrev = end.value;
      pNode.pNext = null;
      end.value = pNode;
    }

    console.assert(head.value !== null);
    console.assert(end.value !== null);
  }

  // ------------------------------------------------------------
  // RemoveFromFront(ref DLink pHead, ref DLink pEnd)
  // ------------------------------------------------------------
  static RemoveFromFront(refs) {
    const { head, end } = refs;
    console.assert(head.value !== null);
    console.assert(end.value !== null);

    const pNode = head.value;
    head.value = pNode.pNext;

    if (head.value !== null) {
      head.value.pPrev = null;
    } else {
      end.value = null;
    }

    pNode.clear();
    return pNode;
  }

  // ------------------------------------------------------------
  // RemoveFromFront(ref DLink pHead)
  // ------------------------------------------------------------
  static RemoveFromFrontSingle(refs) {
    const { head } = refs;
    console.assert(head.value !== null);

    const pNode = head.value;
    head.value = pNode.pNext;

    if (head.value !== null) {
      head.value.pPrev = null;
    }

    pNode.clear();
    return pNode;
  }

  // ------------------------------------------------------------
  // RemoveNode(ref DLink pHead, ref DLink pEnd, DLink pNode)
  // ------------------------------------------------------------
  static RemoveNode(refs, pNode) {
    const { head, end } = refs;
    console.assert(head.value !== null);
    console.assert(end.value !== null);
    console.assert(pNode !== null);

    if (pNode.pPrev !== null) {
      pNode.pPrev.pNext = pNode.pNext;
      if (pNode === end.value) {
        end.value = pNode.pPrev;
      }
    } else {
      head.value = pNode.pNext;
      if (pNode === end.value) {
        end.value = pNode.pNext;
      }
    }

    if (pNode.pNext !== null) {
      pNode.pNext.pPrev = pNode.pPrev;
    }

    pNode.clear();
  }

  // ------------------------------------------------------------
  // AddBeforeNode(ref DLink pHead, ref DLink pEnd,
  //               DLink pTarget, DLink pNode)
  // ------------------------------------------------------------
  static AddBeforeNode(refs, pTarget, pNode) {
    const { head, end } = refs;
    console.assert(pTarget !== null);
    console.assert(pNode !== null);
    console.assert(head.value !== null);
    console.assert(end.value !== null);

    pNode.pNext = pTarget;
    pNode.pPrev = pTarget.pPrev;

    if (pTarget.pPrev !== null) {
      pTarget.pPrev.pNext = pNode;
    } else {
      head.value = pNode;
    }

    pTarget.pPrev = pNode;
  }

  // ------------------------------------------------------------
  // AddAfterNode(ref DLink pHead, ref DLink pEnd,
  //              DLink pTarget, DLink pNode)
  // ------------------------------------------------------------
  static AddAfterNode(refs, pTarget, pNode) {
    const { head, end } = refs;
    console.assert(pTarget !== null);
    console.assert(pNode !== null);
    console.assert(head.value !== null);
    console.assert(end.value !== null);

    pNode.pPrev = pTarget;
    pNode.pNext = pTarget.pNext;

    if (pTarget.pNext !== null) {
      pTarget.pNext.pPrev = pNode;
    } else {
      end.value = pNode;
    }

    pTarget.pNext = pNode;
  }
}
