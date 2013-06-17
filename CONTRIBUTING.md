# Contributing

To tweak the project:

1. Fork the repo
2. Run:
    ```bash
    # initial setup
    ./bin/bootstrap
    # run tests (should pass)
    grunt
    ```
3. [Load the extension](https://developer.chrome.com/extensions/getstarted.html#unpacked) ("Load unpacked extension..." [here](chrome://extensions/))
4. Install [Extensions Reloader](https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid)

## Packaging

```bash
grunt -v compress
```
