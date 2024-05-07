# Demo Video

https://youtu.be/y_FYCLihdAI

## DevPost

## Version 2.0
I remade the entire app with React.js and trained a new model as of May 5, 2024. You can check out the original devpost submission and repository here:https://devpost.com/software/ecosort-jhrp0e

# How it Works

1. Used `react-webcam` to capture an image from the user in base64 format
2. This is converted to a binary format (byte array) to pass through the Azure Custom Vision API
3. A custom model was trained on Azure and it recieves the image, makes it's prediction and sends the results back
4. The front-end updates the page with dynamic counts for the number of recycling/trash/compost images that have been seen so far.

# Technical Challenges

1. Since this was a custom model and I had not used Microsoft Azure before, it was a slight learning curve figuring out how to upload a dataset, train it, and which API's to use.
2. I had to work with the free-tier limits including a max of 5,000 images and 1 hour of training time per month, so another challenge here was finding the right dataset. I scoured Kaggle for valid datasets and found a simplistic one to do the job after an hour.


# The Issue at Hand

## Global Waste Management

Waste management is a very serious issue across the world. In simple terms, only specific materials can be recycled, and when other objects are mixed in, the entire batch has to be thrown into the garbage. Whenever citizens don’t recycle properly or dispose of waste improperly, waste management is a harder process. Instead of sorting through the waste, it is simply dumped into landfills or oceans, or is incinerated. If everyday citizens were to recycle items correctly, it would make a huge positive impact on the world.

## Carbon Emissions

Due to ineffective waste management methods, carbon emissions increase. When items that are supposed to be recycled are also thrown into waste, the level of toxins, such as dioxins, released increases by tons. This increases air pollution, contributes to acid rain, and harms the environment.

## Resources

When materials are recycled, much fewer resources are required to recreate the same product. This increases efficiency, decreases release of toxins, decreases need to acquire resources from the environment, and provides a “greener” way to create products. However, due to ineffective waste management, a lot of recyclable items are incinerated or disposed of as waste. This increases the carbon footprint of each individual by tons.

# The Importance of the Product

## Why is this Product Important?

To tackle the aforementioned issues, ecoSort was developed. This product sorts through waste items one by one as they are thrown, determines whether they are recyclable, compostable, or simply garbage. It then alerts the user to throw it in a specific bin. This will increase awareness in citizens, reduce carbon emissions by millions of tons if applied properly, and reduce environment harm. This product is necessary to improve waste management because no matter how many guides or brochures are given, people get caught up and forget to take time to dispose of items correctly. By applying this software to a simple bot in a large trashcan, it can automatically sort the items into the required bins. This minimizes the efforts required by the user, and maximizes effective waste management. In short, this product is the necessary bridge between pure laziness and a clean world

## How is it different from other Products?

There are several other products out in the market which are working towards the same goal. However, they are ineffective due to the fact that they are applied to large waste management and recycling plants. Most of this work is done through labor workers at plants, but with the introduction of machine learning, large machines and software have been used to sort through recycling. The key difference between these sorting methods and ecoSort is the fact that ecoSort can be applied to smaller locations. It tackles the root of the problem right away, when the item is disposed of, instead of when all the items are gathered. This makes the problem much easier to solve, and this AI system can easily be implemented using a camera, and a simple lever system within a disposal container.

# Future Applications

## Model

Using a simple sort system (similar to movable garbage chutes), a camera, and simple levers, this software can be applied to almost any everyday garbage chute, or modified to be simpler for waste disposal bins at home.

## How it would work

The user throws the items one by one into an input chute which contains the camera. The software snaps a picture of the item, and the ML component determines which bin it should go into. Based on this, the required chute is opened and the object would fall into the designated bin (recycling, compost, or garbage). With more information, this system can be applied easily to all around the world to reduce carbon emissions!
