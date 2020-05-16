# Ourapp
* https://ourapp-frontend.web.app/
* https://ourapp-frontend.web.app/admin/branch/manage

# Api host
* https://api-dut.herokuapp.com/api/v1/swagger-ui.html
# Run App
```bash
npm run start

```

## Debug

* configurations in Vscode, `launch.json` file

```bash
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceRoot}/src",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
```

## Links
* https://redux.js.org/
* https://reactjs.org/