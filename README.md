# [Visit the wiki](https://github.com/Carepatron/Carepatron-Test-Full/wiki)

Extras

1. Quality and best practices
   When it comes to applying the best practices in this exam, I've come up with some approaches and patterns that are reasonable to use:

   - Compound Components pattern: I've applied this pattern in various areas of the components that needs composition. Especially on the CreateNewClientModal to separate different concerns like its Form, Stepper, and Actions. Given that the component isn't really large and complex, I didn't abstract everything too much because I dont wan't to end up over-engineering the feature.

   - Comments: I've written down comments on functions and components to help explain their purpose and behavior, which can be helpful for other developers or for future reference. This is a good practice, especially in larger codebases or when the logic is more complex.

   - Reusability: In some cases, I've abstracted layers of configurations like overriding MUI theme components and palettes to separate their concerns into different files. Making them reusable and easily configured when the app scales.

2. How close to the designs is your submission?
   - If you needed to change something in the future (size/color of buttons), how easy would it be?
     - Since I've already abstracted the configuration of the mui theme, it would now
     be easier for devs to navigate the file and change some styles. They won't need to
     go to different components just to update a color of a button.
    
    - How does this look on different devices?
     - On a mobile and tablet device, it looks responsive and easier to navigate since I've made some grids and components flexible using mui breakpoints. As for the different desktop views, there's not much change since the default style is already applied.

3. How can your submission allow for scalability?

   - What if a customer has thousands of records?
     - If the customer has thousands of records, it would be more beneficial to put the search logic in the backend. Handling thousands of records on the frontend could lead to performance issues, as loading and processing such a large amount of data can slow down the application and consume excessive resources on the user's device.

   - How is state managed as the codebase grows?
     - As the codebase grows, the state will be managed depending on its requirements and complexities. The existing structure of the clients state that uses reducer function to fetch and return the clients data is a good example of a pattern that avoids prop drilling that might worsen the sharing of states between related components. Moreover, the team can also decide whether to use third party libraries like RTK or React-query to manage the state better.

   - How can we support multiple countries?
    - If it's about supporting the user's locale, we have to implement internationalization in the application to support multiple languages. Use libraries like react-i18next or react-intl to manage translations and switch content based on the user's locale. However, if it's about handling different client data from different countries, we may have to add additional information on the cliet's form related to country-specific data.

4. How can you ensure the app behaves as you intend it to?
    - There are some ways to ensure the app behaves as I intend it to:

      - Unit Testing: Write comprehensive unit tests for individual functions, components, and modules. Unit tests verify that isolated units of code work correctly and help catch bugs early in the development process.
    
    - Code Reviews: Conduct peer code reviews to catch potential logic errors or coding mistakes. Code reviews promote best practices and improve code quality.

5. How intuitive is the behavior of the app?
    - 