# React Native Fade Carousel

React Native Fade Carousel is a RN package to allow transitions between images using a fade in/out effect.

![Preview](https://i.ibb.co/jrXSr9j/Fade-Carousel480.gif)

## Installation

```bash
npm install rn-fade-carousel --save
```

## Usage

#### Properties:

| Property       | Type   | Description                                                                                                                                                               |
| :------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| elements       | Array  | An array of [Image](https://reactnative.dev/docs/image) elements. You need to specify the size of the images in the styles props of the Image element (See sample below). |
| containerStyle | Object | The style object configuration that you would like for the carousel wrapper View.                                                                                         |
| fadeDuration   | Int    | The time in milliseconds that you would the fade transitions to last.                                                                                                     |
| stillDuration  | Int    | The time in milliseconds that you would like the image to stay visible after the fade in transition.                                                                      |
| start          | Boolan | a flag to tell the component to start (true) or stop (false) the transition of the images.                                                                                |

## Sample

```javascript
import React, { Component } from "react";
import { View, Image, Dimensions } from "react-native";
import FadeCarousel from "rn-fade-carousel";
import Wall1 from "./src/images/01.jpg";
import Wall2 from "./src/images/02.jpg";
import Wall3 from "./src/images/03.jpg";
import Wall4 from "./src/images/04.jpg";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

export default class App extends Component {
    slides = [
        <Image source={Wall1} style={styles.imageScroll} resizeMode="cover" />,
        <Image source={Wall2} style={styles.imageScroll} resizeMode="cover" />,
        <Image source={Wall3} style={styles.imageScroll} resizeMode="cover" />,
        <Image source={Wall4} style={styles.imageScroll} resizeMode="cover" />
    ];

    render() {
        return (
            <View style={styles.containerStyle}>
                <FadeCarousel
                    elements={this.slides}
                    containerStyle={styles.carouselContainer}
                    fadeDuration={2000}
                    stillDuration={2000}
                    start={true}
                />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1
    },
    carouselContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    imageScroll: {
        width: screenWidth,
        height: screenHeight
    }
};
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
