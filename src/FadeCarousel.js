import React, { Component } from "react";
import { View, Animated } from "react-native";

export default class FadeCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animationOut: new Animated.Value(1),
            currentIndex: 0,
            elements: []
        };
    }

    async componentDidMount() {
        const { elements, start, stillDuration } = this.props;
        //Saving the element to be shown first
        this.setState({ currentIndex: elements.length - 1 });
        //Animate only if we get start true
        if (start) {
            await this.waitNSeconds(stillDuration / 1000);
            this.fadeOutAnimation();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { start } = this.props;
        //Animate if start change to true
        if (prevProps.start != start && start) this.fadeOutAnimation();
    }

    fadeOutAnimation = () => {
        //Resseting the Animated value to 1, so the next loop it will fadeout again
        this.setState({ animationOut: new Animated.Value(1) });
        Animated.timing(this.state.animationOut, {
            toValue: 0,
            duration: this.props.fadeDuration,
            useNativeDriver: true
        }).start(async () => {
            const { elements, start } = this.props;
            const { stillDuration } = this.props;

            //Time that the slide will be visible
            await this.waitNSeconds(stillDuration / 1000);

            //Let's calculate the next slide to be shown
            if (this.state.currentIndex > 0) this.state.currentIndex--;
            else this.state.currentIndex = elements.length - 1;

            //If start is true, let's continue the loop
            if (start) this.fadeOutAnimation();
        });
    };

    waitNSeconds = (seconds) =>
        new Promise(async (resolve, reject) => {
            try {
                setTimeout(() => {
                    return resolve({});
                }, seconds * 1000);
            } catch (error) {
                return reject(error);
            }
        });

    render() {
        const { containerStyle, elements, elementStyles } = this.props;
        const { animationOut, currentIndex } = this.state;

        let eleStyles = elementStyles
            ? [elementStyles, { position: "absolute" }]
            : { position: "absolute", height: "auto", width: "auto" };

        return (
            <View style={[{ zIndex: 0, width: "100%" }, containerStyle]}>
                {elements.map((element, i) => {
                    //Defautl opacity style
                    let styleA = { opacity: 1 };

                    let zIndex = 0;
                    //If current item, we put it in front with a higher zIndex
                    if (i == currentIndex) {
                        zIndex = 2;
                        styleA = { opacity: animationOut };
                    }
                    //We put in the back the next element to be shown, and if we are in the last element,
                    //we put the first element instead.
                    if (i == currentIndex - 1 || (currentIndex == 0 && i == elements.length - 1)) zIndex = 1;
                    //For all other slides, zIndex will be the lowest, so they will be at the bottom back
                    styleA.zIndex = zIndex;

                    return (
                        <Animated.View key={i} style={[styleA, eleStyles]}>
                            {element}
                        </Animated.View>
                    );
                })}
            </View>
        );
    }
}
