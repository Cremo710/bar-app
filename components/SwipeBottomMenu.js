import React, { useCallback, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT * 0.75; // 85% dell'altezza dello schermo
const MIN_TRANSLATE_Y = -SCREEN_HEIGHT * 0.25; // 25% visibile inizialmente

const SwipeBottomMenu = ({ visible, onMenuClose, children, title }) => {
    const translateY = useSharedValue(0);

    useEffect(() => {
        if (visible) {
            // Posizione iniziale: 25% visibile
            scrollTo(MIN_TRANSLATE_Y);
        } else {
            scrollTo(0);
        }
    }, [visible]);

    const scrollTo = useCallback((destination) => {
        'worklet';
        translateY.value = withSpring(destination, { 
            damping: 20,                // Ridotto per un movimento più fluido
            stiffness: 100,             // Ridotto per un'animazione più lenta
            mass: 0.8,                  // Aggiunto per un effetto più morbido
            overshootClamping: false,    // Disattivato per fluidità
            restSpeedThreshold: 0.5,     // Aumentato per ridurre la precisione dell'arresto
            restDisplacementThreshold: 0.5  // Aumentato per ridurre la precisione dell'arresto
        });
    }, []);

    const context = useSharedValue({ y: 0 });
    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value };
        })
        .onUpdate((event) => {
            const y = event.translationY + context.value.y;
            // Limita lo spostamento tra la posizione chiusa (0) e quella massima aperta (MAX_TRANSLATE_Y)
            if (y >= MAX_TRANSLATE_Y && y <= 0) {
                translateY.value = y;
            }
        })
        .onEnd((event) => {
            // Calcola la velocità dello swipe
            const velocityY = event.velocityY;
            
            // Se la velocità è significativa, segui la direzione dello swipe
            if (Math.abs(velocityY) > 500) {
                if (velocityY < 0) {
                    // Swipe verso l'alto
                    scrollTo(MAX_TRANSLATE_Y);
                } else {
                    // Swipe verso il basso
                    if (translateY.value > MIN_TRANSLATE_Y / 2) {
                        runOnJS(onMenuClose)(false);
                    } else {
                        scrollTo(MIN_TRANSLATE_Y);
                    }
                }
            } 
            // Altrimenti, valuta la posizione di rilascio
            else {
                const midPoint = (MAX_TRANSLATE_Y + MIN_TRANSLATE_Y) / 2;
                if (translateY.value < midPoint) {
                    scrollTo(MAX_TRANSLATE_Y);
                } else if (translateY.value > MIN_TRANSLATE_Y / 2) {
                    runOnJS(onMenuClose)(false);
                } else {
                    scrollTo(MIN_TRANSLATE_Y);
                }
            }
        });

    const barBottomSheetStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: Math.max(SCREEN_HEIGHT * 0.25, SCREEN_HEIGHT + translateY.value)
            }]
        };
    });

    return (
        <Animated.View style={[styles.menuContainer, barBottomSheetStyle]}>
            <View style={styles.bodyContainer}>
                <GestureDetector gesture={gesture}>
                    <View style={styles.gestureBar}>
                        <View style={styles.dragHandle} />
                        {title && <Text style={styles.menuTitle}>{title}</Text>}
                    </View>
                </GestureDetector>
                <View style={styles.contentContainer}>
                    {children}
                </View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    menuContainer: {
        position: 'absolute',
        height: SCREEN_HEIGHT,
        width: '100%',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 11,
    },
    bodyContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        overflow: 'hidden',
        height: SCREEN_HEIGHT * 0.9, // 90% per lasciare spazio all'animazione
    },
    gestureBar: {
        width: '100%',
        paddingVertical: 12,
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    dragHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#E0E0E0',
        borderRadius: 3,
        marginBottom: 8,
    },
    menuTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
    }
});

export default SwipeBottomMenu;