<h1 align="center">
    <img src="https://i.imgur.com/IGvYQTh.png" width="15%">
    <p>stati</p>
</h1>

<div align="center">
    <img src="https://i.imgur.com/9Bhw5Fv.png" width="70%">
</div>

## How to access friends' activity data?

You need to log in to the web version of the Spotify app and copy a cookie value called `sp_dc`. This is necessary because the app uses a non-public endpoint to retrieve this data, which requires this cookie. This is a one-time action. The next time you open the app, we will remember this value.

### Safari

1. Open a Private window and navigate to https://open.spotify.com.
2. Log in to your Spotify account.
3. Use `Command + Option + C` to open the browser’s developer tools.
4. Access the `Storage` section within the developer tools menu.
5. Locate and copy the value of `sp_dc` cookie.
6. Ensure to close the window without logging out to keep the cookie valid.

### Chrome

1. Open an Incognito window and navigate to https://open.spotify.com.
2. Log in to your Spotify account.
3. Use `Command + Option + I` (Mac) or `Control + Shift + I` or `F12` to open the browser’s developer tools.
4. Access the `Application` section within the developer tools menu.
5. Locate and copy the value of `sp_dc` cookie.
6. Ensure to close the window without logging out to keep the cookie valid.

### Firefox

1. Open an Incognito window and navigate to https://open.spotify.com.
2. Log in to your Spotify account.
3. Use `Command + Option + I` (Mac) or `Control + Shift + I` or `F12` to open the browser's developer tools.
4. Access the `Storage` section within the developer tools menu.
5. Locate and copy the value of `sp_dc` cookie.
6. Ensure to close the window without logging out to keep the cookie valid.

## Figma design for this app

<a href="https://www.figma.com/file/jQQ6F4as97CozaddAxHajc/Stati?type=design&t=HbZBjWtO6kgfTSFb-6" alt="Figma design">
    Figma design
</a>

## Demo

<a href="https://i.imgur.com/bhRcz6G.mp4" alt="Demo">
    Demo
</a>

## License

<a href="https://github.com/dawid-bytys/stati/blob/main/LICENSE">MIT</a>
