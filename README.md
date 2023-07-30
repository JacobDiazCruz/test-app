## Extras

**1. Quality and best practices**

   When it comes to applying the best practices in this exam, I have come up with some approaches and patterns that are reasonable to use:

   - _Compound Components pattern_: I have applied this pattern in various areas of the components that need composition. Especially on the `CreateNewClientModal` to separate different concerns like its `Form`, `Stepper`, and `Actions`. Given that the component is not overly large and complex, I chose not to abstract everything too much because I do not want to end up over-engineering the feature.

   - _Configurability_: Adding form steps or form fields would be easy in the current implementation of the `Create New Client` form. This can be done by modifying `formConfig` file without having to change anything in the components. This makes it easy to modify the form whenever the requirements change. Additionally, I have also created configurations for overriding MUI theme components and palettes to separate their concerns into different files, making them easily configurable when the app scales. 

   - _Reusability_: I have implemented reusable components that can be shared accross the entire app. An example of this is the `UnsavedChangesDialog` component, since some form modals in the future might have the same need for it as well.

   - _Comments_: I have written down comments on functions and components to help explain their purpose and behavior, which can be helpful for other developers or for future reference. This is a good practice, especially in larger codebases or when the logic is more complex.

**2. How close to the designs is your submission?**
  - If you needed to change something in the future (size/color of buttons), how easy would it be?
     - Since I created a separate configuration of the mui theme, it would now
     be easier for devs to navigate the file and change some styles. They will no longer need to
     go to different components just to update a color of a button.
    
  - How does this look on different devices?
     - On mobile and tablet devices, it looks responsive and easier to navigate since I have made some grids and components flexible using mui breakpoints. As for the different desktop views, there is not much change since the default style is already applied.

**3. How can your submission allow for scalability?**

  - What if a customer has thousands of records?
     - If the customer has thousands of records, it would be more beneficial to put the search logic in the backend. Handling thousands of records on the frontend could lead to browser performance issues, as loading and processing such a large amount of data can slow down the application and consume excessive resources on the user's device. We can also put infinite loading or paging so that the records will only load as needed.

  - How is state managed as the codebase grows?
     - Since we already have an existing state provider for clients, we can just insert additional types and reducer logic if another mutation is needed. Moreover, this context pattern can be reused to other features as well if it is needed in future requirements. This pattern creates a centralized state management for the app, and it benefits the engineers by having a structured way of managing the state.

  - How can we support multiple countries?
    - If it is about supporting the user's locale, we have to implement internationalization in the application to support multiple languages. Use libraries like `react-i18next` or `react-intl` to manage translations and switch content based on the user's locale. However, if it is about handling different client data from different countries, we may have to add additional information on the client's form related to country-specific data.

**4. How can you ensure the app behaves as you intend it to?**
    
   - There are some ways to ensure the app behaves as I intend it to:
      - _Unit Testing_: Write comprehensive unit tests for individual functions, components, and modules. Unit tests verify that isolated units of code work correctly and help catch bugs early in the development process.
    
      - _Code Reviews_: Conduct peer code reviews to catch potential logic errors or coding mistakes. Code reviews promote best practices and improve code quality.

      - _Requirement Verification_: Check existing specifications or documents to validate intended behavior. If there are no available requirements documented, we can check with the Business Analyst or the team to verify the target behavior and output.

**5. How intuitive is the behavior of the app?**
   - In terms of its user experience, it is intuitive enough for the users to easily navigate the app's functionalities. However, here are parts that I would like to point out and make suggestions for:

      - _Modal Backdrop_: Currently, the design does not specify an opacity for the modal's backdrop to be identified easily. It would be better for the future to set a darker background to give importance to the modal as a form that needs to be prioritized on the page.

      - _Unsave changes dialog_: I have implemented a dialog where the user will be prompted by a question if they want to discard their changes and exit the modal. This appears when they supplied values in the form but they click the close button without saving it. This will prevent user errors and will definetely make the UX better.