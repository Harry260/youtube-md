<p align="center">
   <img src="./public/images/icon.png" width="100px">
   <h2 align="center">Youtube MD</h2>
   <p align="center">A simple tool to embed youtube video to your markdown!</p>
</p>

<hr>

<br>

<a href="https://youtube-md.vercel.app/">

| Open Editor |
| ----------- |

</a>

## Table Of Contents

-   [Example](#example)
-   [Usage](#usage)
-   [Support](#support)
-   [License](#license)
    <br>

### Example

Embeding Youtube videos to markdown is impossible. But, you can use this tool to embed youtube video "thumbnail" with all elements which look like real embed. Example below:

```md
[![Me at the zoo](https://youtube-md.vercel.app/jNQXAC9IVRw/640/360)](https://www.youtube.com/watch?v=jNQXAC9IVRw)
```

[![Me at the zoo](https://youtube-md.vercel.app/jNQXAC9IVRw/640/360)](https://www.youtube.com/watch?v=jNQXAC9IVRw)

### Usage

You can either use the web app to generate the code or use the Web Api.

<a href="https://youtube-md.vercel.app/">

| Open Web Editor |
| --------------- |

</a>

##### API

| `https://youtube-md.vercel.app/<video-id*>/<width>/<height>` |
| ------------------------------------------------------------ |

`*`: required

| Parameter  | Description                                                      | Type  | optional |
| ---------- | ---------------------------------------------------------------- | ----- | -------- |
| `video-id` | Id of the YouTube video you want to add                          | Param | No       |
| `width`    | Width of the image. Used as `height` if only `width` is provided | Param | Yes      |
| `height`   | Height of the Image                                              | Param | Yes      |
| `?height`  | Same as `height`                                                 | Query | Yes      |
| `?width`   | Same as `width`                                                  | Query | Yes      |

> Note: Default values for width and height are `640` and `360 `respectively.

### Support

Support this project by buying me a coffee and starring ⭐ this repo!

<a href="https://www.buymeacoffee.com/harrytom" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a><br>

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
