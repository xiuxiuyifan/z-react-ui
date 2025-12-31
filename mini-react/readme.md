## vdom 生成

虚拟 dom 生成，createElement 函数，执行生成虚拟 dom

```
{
  "type": "div",
  "props": {
    "children": [
      {
        "type": "a",
        "props": {
          "href": "xxx",
          "children": [
            {
              "type": "TEXT_ELEMENT",
              "props": {
                "nodeValue": "link",
                "children": []
              }
            }
          ]
        }
      }
    ]
  }
}
```

### vdom => fiber reconcile 过程
