import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  CheckCircle,
  XCircle,
  RotateCcw,
  Moon,
  Sun,
} from "lucide-react";

interface SwiftQuizProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const SwiftQuiz: React.FC<SwiftQuizProps> = ({ darkMode, setDarkMode }) => {
  // Question data structure
  const questions = [
    // Swift Fundamentals (1-20)
    {
      id: 1,
      category: "Swift Fundamentals",
      question:
        "Which of the following is the correct way to declare an optional String in Swift 6.2?",
      options: [
        "String optional = null",
        "var name: String?",
        "Optional<String> name",
        "var name: String | nil",
      ],
      correct: 1,
      hint: "Swift uses a question mark (?) to denote optional types.",
      explanation:
        "In Swift, optional types are declared using a question mark after the type name. This indicates the variable can either hold a value of that type or nil.",
    },
    {
      id: 2,
      category: "Swift Fundamentals",
      question: "What's the difference between 'let' and 'var' in Swift?",
      options: [
        "let is for integers, var is for strings",
        "let creates constants, var creates variables",
        "let is for classes, var is for structs",
        "There is no difference",
      ],
      correct: 1,
      hint: "Think about mutability - which one can change after declaration?",
      explanation:
        "'let' creates immutable constants that cannot be changed after initial assignment, while 'var' creates mutable variables that can be reassigned.",
    },
    {
      id: 3,
      category: "Swift Fundamentals",
      question:
        "What is the result of the nil-coalescing operator in: let result = optionalValue ?? 'default'",
      options: [
        "Always returns 'default'",
        "Returns optionalValue if it has a value, otherwise 'default'",
        "Returns nil if optionalValue is nil",
        "Throws an error if optionalValue is nil",
      ],
      correct: 1,
      hint: "The ?? operator provides a fallback value when the optional is nil.",
      explanation:
        "The nil-coalescing operator (??) returns the unwrapped value if the optional contains a value, otherwise it returns the right-hand side value as a fallback.",
    },

    // More Swift Fundamentals (4-20)
    {
      id: 4,
      category: "Swift Fundamentals",
      question:
        "Which Swift 6.2 feature helps prevent data races at compile time?",
      options: [
        "Complete concurrency checking",
        "Optional binding",
        "Type inference",
        "Automatic reference counting",
      ],
      correct: 0,
      hint: "This feature was enabled by default in Swift 6 and helps with thread safety.",
      explanation:
        "Swift 6 introduced complete concurrency checking by default, which detects potential data races at compile time rather than runtime.",
    },
    {
      id: 5,
      category: "Swift Fundamentals",
      question: "What does the 'guard' statement do in Swift?",
      options: [
        "Protects code from crashes",
        "Provides early exit when conditions aren't met",
        "Guards against memory leaks",
        "Prevents inheritance",
      ],
      correct: 1,
      hint: "Guard statements are used for early exit patterns and must transfer control.",
      explanation:
        "Guard statements provide early exit from a function, method, or loop when a condition is not met, and must include a control transfer statement like return, break, continue, or throw.",
    },
    {
      id: 6,
      category: "Swift Fundamentals",
      question: "What is a computed property in Swift?",
      options: [
        "A property that is calculated automatically",
        "A property with a getter and optionally a setter",
        "A property that uses lazy initialization",
        "A property that computes its memory address",
      ],
      correct: 1,
      hint: "These properties don't store values directly but provide a way to access and set other properties.",
      explanation:
        "Computed properties don't store values directly. Instead, they provide a getter and an optional setter to retrieve and set other properties and values indirectly.",
    },

    // Functions & Closures (21-35)
    {
      id: 21,
      category: "Functions & Closures",
      question:
        "What is the difference between @escaping and @nonescaping closures?",
      options: [
        "@escaping closures run faster",
        "@escaping closures can be called after the function returns",
        "@nonescaping closures can capture self",
        "There is no functional difference",
      ],
      correct: 1,
      hint: "Think about when the closure can be executed relative to the function's lifetime.",
      explanation:
        "@escaping closures can be stored and called after the function returns, while @nonescaping closures (default) must be called before the function returns.",
    },
    {
      id: 22,
      category: "Functions & Closures",
      question: "What does the 'inout' parameter modifier do?",
      options: [
        "Makes the parameter optional",
        "Allows the function to modify the parameter's value",
        "Prevents the parameter from being nil",
        "Makes the parameter a constant",
      ],
      correct: 1,
      hint: "This modifier allows functions to modify variables passed as arguments.",
      explanation:
        "'inout' parameters allow functions to modify the values of arguments passed to them, and these changes persist after the function call ends.",
    },
    {
      id: 23,
      category: "Functions & Closures",
      question: "What is trailing closure syntax in Swift?",
      options: [
        "A closure that comes at the end of a file",
        "A way to write closures outside the function parentheses",
        "A closure that executes last",
        "A closure with delayed execution",
      ],
      correct: 1,
      hint: "This syntax makes code more readable when the closure is the last parameter.",
      explanation:
        "Trailing closure syntax allows you to write the closure argument outside the function parentheses when it's the last parameter, making code more readable.",
    },

    // Value vs Reference Types (36-50)
    {
      id: 36,
      category: "Value vs Reference Types",
      question: "What happens when you assign one struct instance to another?",
      options: [
        "Both variables reference the same memory",
        "A copy is made",
        "The original instance is moved",
        "A weak reference is created",
      ],
      correct: 1,
      hint: "Structs are value types in Swift.",
      explanation:
        "Structs are value types, so when you assign one struct to another, a copy is made. Changes to one instance don't affect the other.",
    },
    {
      id: 37,
      category: "Value vs Reference Types",
      question: "What is ARC in Swift?",
      options: [
        "Automatic Reference Counting",
        "Array Reference Collector",
        "Async Runtime Controller",
        "Actor Reference Counter",
      ],
      correct: 0,
      hint: "This memory management system automatically tracks and manages memory for reference types.",
      explanation:
        "ARC (Automatic Reference Counting) automatically tracks and manages memory usage by keeping count of references to class instances.",
    },
    {
      id: 38,
      category: "Value vs Reference Types",
      question: "What's a retain cycle and how do you break it?",
      options: [
        "A performance optimization technique",
        "Strong references creating a loop, broken with weak/unowned",
        "A type of loop structure",
        "A memory allocation pattern",
      ],
      correct: 1,
      hint: "This occurs when two objects hold strong references to each other.",
      explanation:
        "A retain cycle occurs when two or more objects hold strong references to each other, preventing ARC from deallocating them. Break cycles using weak or unowned references.",
    },

    // Swift 6.2 Memory Features (39-50)
    {
      id: 39,
      category: "Value vs Reference Types",
      question: "What is InlineArray in Swift 6.2?",
      options: [
        "An array that stores elements inline without heap allocation",
        "An array with automatic sorting",
        "An array that expands dynamically",
        "An array optimized for networking",
      ],
      correct: 0,
      hint: "This new Swift 6.2 feature allows fixed-size arrays with stack storage.",
      explanation:
        "InlineArray is a fixed-size array with inline storage for elements, stored on the stack or directly within other types without heap allocation.",
    },
    {
      id: 40,
      category: "Value vs Reference Types",
      question: "What does the Span type provide in Swift 6.2?",
      options: [
        "Time measurement capabilities",
        "Safe access to contiguous memory",
        "Network request handling",
        "UI layout spanning",
      ],
      correct: 1,
      hint: "This type offers a safe alternative to unsafe buffer pointers.",
      explanation:
        "Span provides safe, direct access to contiguous memory while maintaining memory safety through compile-time checks.",
    },

    // Functional Programming (51-70)
    {
      id: 51,
      category: "Functional Programming",
      question: "What does the map function do?",
      options: [
        "Creates a dictionary from an array",
        "Transforms each element in a collection",
        "Finds the location of elements",
        "Sorts a collection",
      ],
      correct: 1,
      hint: "This function applies a transformation to every element in a collection.",
      explanation:
        "Map transforms each element in a collection by applying a function to each element, returning a new collection with the transformed values.",
    },
    {
      id: 52,
      category: "Functional Programming",
      question: "What's the difference between map and flatMap?",
      options: [
        "map is faster than flatMap",
        "flatMap flattens nested collections",
        "map works with optionals, flatMap doesn't",
        "There is no difference",
      ],
      correct: 1,
      hint: "One of these functions can handle nested structures and flatten them.",
      explanation:
        "While map transforms elements 1:1, flatMap can transform elements that might result in collections and then flattens the result into a single collection.",
    },
    {
      id: 53,
      category: "Functional Programming",
      question: "What does the reduce function do?",
      options: [
        "Removes elements from a collection",
        "Combines all elements into a single value",
        "Makes a collection smaller",
        "Optimizes memory usage",
      ],
      correct: 1,
      hint: "This function combines elements using an accumulator pattern.",
      explanation:
        "Reduce combines all elements in a collection into a single value using a combining closure that's repeatedly applied.",
    },

    // Async/Await Fundamentals (71-85)
    {
      id: 71,
      category: "Async/Await Fundamentals",
      question: "How do you declare an asynchronous function in Swift?",
      options: [
        "func myFunction() -> async String",
        "async func myFunction() -> String",
        "func myFunction() async -> String",
        "func myFunction() -> String async",
      ],
      correct: 2,
      hint: "The async keyword comes after the parameter list but before the return type.",
      explanation:
        "In Swift, async functions are declared with 'async' between the parameter list and return type: func myFunction() async -> String",
    },
    {
      id: 72,
      category: "Async/Await Fundamentals",
      question: "What keyword do you use to call an async function?",
      options: ["async", "await", "call", "execute"],
      correct: 1,
      hint: "This keyword suspends the current function until the async operation completes.",
      explanation:
        "The 'await' keyword is used to call async functions and suspends execution until the async operation completes.",
    },
    {
      id: 73,
      category: "Async/Await Fundamentals",
      question: "What is an AsyncSequence?",
      options: [
        "A sequence that processes elements asynchronously",
        "A sorted collection",
        "A sequence with async elements",
        "A parallel processing queue",
      ],
      correct: 0,
      hint: "This allows you to iterate over elements that arrive asynchronously over time.",
      explanation:
        "AsyncSequence allows asynchronous iteration over elements that arrive over time, perfect for streaming data or network responses.",
    },
    {
      id: 74,
      category: "Async/Await Fundamentals",
      question: "How do you iterate over an AsyncSequence?",
      options: [
        "for element in sequence",
        "for await element in sequence",
        "await for element in sequence",
        "async for element in sequence",
      ],
      correct: 1,
      hint: "You need to use both 'for' and 'await' keywords in the loop.",
      explanation:
        "Use 'for await' to iterate over an AsyncSequence: for await element in sequence { ... }",
    },
    {
      id: 75,
      category: "Async/Await Fundamentals",
      question: "What happens when an async function throws an error?",
      options: [
        "The error is ignored",
        "The function returns nil",
        "The error propagates to the caller",
        "The app crashes",
      ],
      correct: 2,
      hint: "Async functions can throw errors just like synchronous functions.",
      explanation:
        "When an async function throws an error, it propagates to the caller just like with synchronous throwing functions.",
    },

    // Advanced Concurrency (86-100)
    {
      id: 86,
      category: "Advanced Concurrency",
      question: "What is an Actor in Swift?",
      options: [
        "A class that handles UI events",
        "A reference type that protects its state from data races",
        "A function that executes asynchronously",
        "A protocol for async operations",
      ],
      correct: 1,
      hint: "This provides thread-safe access to mutable state in concurrent code.",
      explanation:
        "An Actor is a reference type that protects its mutable state from data races by ensuring only one task can access its state at a time.",
    },
    {
      id: 87,
      category: "Advanced Concurrency",
      question: "What does @MainActor do?",
      options: [
        "Creates the main thread",
        "Ensures code runs on the main thread",
        "Marks the primary actor in an app",
        "Optimizes performance",
      ],
      correct: 1,
      hint: "This attribute ensures code execution happens on the main thread, important for UI updates.",
      explanation:
        "@MainActor ensures that the marked code runs on the main thread, which is essential for UI updates and main-thread-only APIs.",
    },
    {
      id: 88,
      category: "Advanced Concurrency",
      question: "What is the @concurrent attribute in Swift 6.2?",
      options: [
        "Marks code that should run in parallel",
        "Optimizes concurrent performance",
        "Indicates code that can run on concurrent thread pool",
        "Creates multiple threads automatically",
      ],
      correct: 2,
      hint: "This new Swift 6.2 attribute indicates when code may run concurrently vs staying serialized.",
      explanation:
        "The @concurrent attribute in Swift 6.2 indicates that code should run on the concurrent thread pool rather than staying serialized on an actor.",
    },
    {
      id: 89,
      category: "Advanced Concurrency",
      question: "What are Task Groups used for?",
      options: [
        "Organizing related tasks that can run concurrently",
        "Grouping UI elements",
        "Managing memory allocation",
        "Handling error propagation",
      ],
      correct: 0,
      hint: "These allow you to manage multiple concurrent tasks together.",
      explanation:
        "Task Groups allow you to create and manage multiple concurrent tasks together, with structured concurrency and automatic cleanup.",
    },
    {
      id: 90,
      category: "Advanced Concurrency",
      question: "What does the 'sending' keyword do in Swift 6?",
      options: [
        "Sends data over network",
        "Safely transfers values between isolation domains",
        "Broadcasts notifications",
        "Sends tasks to background queue",
      ],
      correct: 1,
      hint: "This keyword helps safely move data between different actors or isolation contexts.",
      explanation:
        "The 'sending' keyword allows safe transfer of values between different isolation domains (like different actors) in Swift 6.",
    },

    // Modern Concurrency Features (101-115)
    {
      id: 101,
      category: "Modern Concurrency Features",
      question: "What is 'main actor isolation by default' in Swift 6.2?",
      options: [
        "All code runs on the main thread automatically",
        "A mode where code runs on main actor without explicit @MainActor",
        "Main actor performance optimization",
        "Automatic UI thread management",
      ],
      correct: 1,
      hint: "This new Swift 6.2 feature reduces annotation overhead for main-thread code.",
      explanation:
        "Swift 6.2 introduces a mode where code can run on the main actor by default without requiring explicit @MainActor annotations, ideal for UI code and scripts.",
    },
    {
      id: 102,
      category: "Modern Concurrency Features",
      question: "How do nonisolated async functions work in Swift 6.2?",
      options: [
        "They always switch to global executor",
        "They run in the caller's execution context",
        "They run without any actor isolation",
        "They execute on background threads only",
      ],
      correct: 1,
      hint: "Swift 6.2 changed how these functions handle execution context to be more intuitive.",
      explanation:
        "In Swift 6.2, nonisolated async functions run in the caller's execution context rather than always switching to the global executor, making them more predictable.",
    },
    {
      id: 103,
      category: "Modern Concurrency Features",
      question: "What are named tasks in Swift 6.2?",
      options: [
        "Tasks with string identifiers",
        "Tasks that can be assigned human-readable names for debugging",
        "Tasks that execute by name",
        "Tasks with predefined names",
      ],
      correct: 1,
      hint: "This feature helps with debugging and profiling concurrent code.",
      explanation:
        "Named tasks in Swift 6.2 allow you to assign human-readable names when creating tasks, which are surfaced in debugging and profiling tools.",
    },
    {
      id: 104,
      category: "Modern Concurrency Features",
      question: "What does robust async stepping in LLDB provide?",
      options: [
        "Faster debugging performance",
        "Reliable stepping into async functions even across threads",
        "Automatic breakpoint setting",
        "Async code optimization",
      ],
      correct: 1,
      hint: "This Swift 6.2 debugging improvement helps when stepping through concurrent code.",
      explanation:
        "Robust async stepping in LLDB allows reliable stepping into asynchronous functions even when the async call requires switching threads.",
    },
    {
      id: 105,
      category: "Modern Concurrency Features",
      question: "How does Swift 6 detect data races?",
      options: [
        "At runtime using monitoring",
        "Through static analysis at compile time",
        "Using external tools",
        "Through dynamic testing",
      ],
      correct: 1,
      hint: "Swift 6's approach prevents data races before the code even runs.",
      explanation:
        "Swift 6 detects potential data races at compile time through static analysis, preventing many concurrency bugs before the code runs.",
    },

    // Combine Basics (116-130)
    {
      id: 116,
      category: "Combine Basics",
      question: "What is a Publisher in Combine?",
      options: [
        "A type that emits values over time",
        "A networking component",
        "A UI component",
        "A database connector",
      ],
      correct: 0,
      hint: "Publishers are the source of data in the Combine framework.",
      explanation:
        "A Publisher is a type that emits a sequence of values over time and can complete successfully or with an error.",
    },
    {
      id: 117,
      category: "Combine Basics",
      question: "What is a Subscriber in Combine?",
      options: [
        "A user who subscribes to notifications",
        "A type that receives values from a Publisher",
        "A paid service component",
        "A UI event handler",
      ],
      correct: 1,
      hint: "Subscribers receive and react to values emitted by Publishers.",
      explanation:
        "A Subscriber is a type that receives values, completion, and errors from a Publisher in the Combine framework.",
    },
    {
      id: 118,
      category: "Combine Basics",
      question: "What does AnyCancellable do?",
      options: [
        "Cancels any operation",
        "Manages subscription lifetime",
        "Prevents memory allocation",
        "Handles error cancellation",
      ],
      correct: 1,
      hint: "This type helps manage when to stop receiving values from a publisher.",
      explanation:
        "AnyCancellable manages the lifetime of a subscription and automatically cancels it when deallocated, preventing memory leaks.",
    },
    {
      id: 119,
      category: "Combine Basics",
      question: "What does the .map operator do in Combine?",
      options: [
        "Creates a dictionary",
        "Transforms each value emitted by a publisher",
        "Maps UI elements",
        "Handles geographical mapping",
      ],
      correct: 1,
      hint: "This operator transforms values as they flow through the publisher chain.",
      explanation:
        "The .map operator transforms each value emitted by a publisher using a provided closure, similar to array's map function.",
    },
    {
      id: 120,
      category: "Combine Basics",
      question: "What does the .filter operator do?",
      options: [
        "Filters UI components",
        "Removes values that don't match a condition",
        "Cleans data streams",
        "Optimizes performance",
      ],
      correct: 1,
      hint: "This operator selectively passes through values based on a condition.",
      explanation:
        "The .filter operator only allows values that satisfy a given condition to pass through the publisher chain.",
    },

    // Advanced Combine (131-145)
    {
      id: 131,
      category: "Advanced Combine",
      question: "What does combineLatest do?",
      options: [
        "Combines the most recent values from multiple publishers",
        "Gets the latest version of an app",
        "Merges arrays together",
        "Updates to latest iOS version",
      ],
      correct: 0,
      hint: "This operator waits for all publishers to emit at least one value.",
      explanation:
        "combineLatest combines the most recent values from multiple publishers, emitting a tuple whenever any publisher emits a new value.",
    },
    {
      id: 132,
      category: "Advanced Combine",
      question: "What's the difference between merge and combineLatest?",
      options: [
        "merge is faster than combineLatest",
        "merge interleaves values, combineLatest waits for all",
        "merge works with more publishers",
        "There is no difference",
      ],
      correct: 1,
      hint: "One combines values from all publishers, the other passes through values as they come.",
      explanation:
        "merge interleaves values from multiple publishers as they arrive, while combineLatest waits for all publishers to emit and combines their latest values.",
    },
    {
      id: 133,
      category: "Advanced Combine",
      question: "What does switchToLatest do?",
      options: [
        "Switches to the latest iOS version",
        "Switches to the latest emitted publisher and cancels previous ones",
        "Updates to newest data",
        "Switches between UI states",
      ],
      correct: 1,
      hint: "This operator is useful when you have a publisher of publishers.",
      explanation:
        "switchToLatest takes a publisher that emits publishers and switches to each new publisher, canceling the previous subscription.",
    },
    {
      id: 134,
      category: "Advanced Combine",
      question: "How do you handle errors with the .catch operator?",
      options: [
        "It prevents all errors",
        "It replaces the error with a new publisher",
        "It logs errors to console",
        "It crashes the app safely",
      ],
      correct: 1,
      hint: "This operator allows you to recover from errors by providing an alternative publisher.",
      explanation:
        "The .catch operator handles errors by replacing them with a new publisher, allowing the stream to continue.",
    },
    {
      id: 135,
      category: "Advanced Combine",
      question: "What does the .retry operator do?",
      options: [
        "Retries failed operations a specified number of times",
        "Retries forever until success",
        "Retries only network operations",
        "Retries with exponential backoff",
      ],
      correct: 0,
      hint: "This operator attempts to resubscribe to a failed publisher.",
      explanation:
        "The .retry operator resubscribes to a publisher that failed with an error, attempting the operation again up to a specified number of times.",
    },

    // Combine Integration (146-155)
    {
      id: 146,
      category: "Combine Integration",
      question: "What does the @Published property wrapper do?",
      options: [
        "Makes properties public",
        "Creates a publisher for property changes",
        "Publishes data to server",
        "Makes properties thread-safe",
      ],
      correct: 1,
      hint: "This wrapper automatically creates a publisher when the property value changes.",
      explanation:
        "@Published creates a publisher that emits the property's value whenever it changes, perfect for reactive UI updates.",
    },
    {
      id: 147,
      category: "Combine Integration",
      question: "How do you convert a Combine publisher to async/await?",
      options: [
        "Use .async() operator",
        "Use .value or .values properties",
        "Use await publisher()",
        "Use async { publisher }",
      ],
      correct: 1,
      hint: "Modern Swift provides properties to bridge Combine with async/await.",
      explanation:
        "You can use .value (for single values) or .values (for sequences) to convert Combine publishers to work with async/await.",
    },
    {
      id: 148,
      category: "Combine Integration",
      question: "How do you create a custom publisher?",
      options: [
        "Inherit from Publisher protocol",
        "Conform to Publisher protocol",
        "Use PublisherBuilder class",
        "Extend AnyPublisher",
      ],
      correct: 1,
      hint: "You need to implement the Publisher protocol with specific requirements.",
      explanation:
        "Create custom publishers by conforming to the Publisher protocol and implementing the required Output, Failure, and receive(subscriber:) methods.",
    },
    {
      id: 149,
      category: "Combine Integration",
      question: "What is backpressure in Combine?",
      options: [
        "Network pressure monitoring",
        "Managing when a subscriber can't keep up with publisher",
        "Memory pressure handling",
        "UI responsiveness optimization",
      ],
      correct: 1,
      hint: "This occurs when a publisher emits values faster than a subscriber can process them.",
      explanation:
        "Backpressure is the situation where a publisher emits values faster than a subscriber can handle them, requiring strategies to manage the flow.",
    },
    {
      id: 150,
      category: "Combine Integration",
      question: "What does the .buffer operator do?",
      options: [
        "Buffers network requests",
        "Stores values when subscriber isn't ready",
        "Optimizes memory usage",
        "Prevents UI blocking",
      ],
      correct: 1,
      hint: "This operator helps manage backpressure by temporarily storing values.",
      explanation:
        "The .buffer operator collects values from upstream when the downstream subscriber isn't ready to receive them, helping manage backpressure.",
    },

    // SwiftUI Fundamentals (156-175)
    {
      id: 156,
      category: "SwiftUI Fundamentals",
      question: "What is @State used for in SwiftUI?",
      options: [
        "Managing app-wide state",
        "Managing local view state",
        "Storing user preferences",
        "Managing database state",
      ],
      correct: 1,
      hint: "This property wrapper manages mutable state within a single view.",
      explanation:
        "@State is used for managing simple, local state within a SwiftUI view that the view owns and modifies.",
    },
    {
      id: 157,
      category: "SwiftUI Fundamentals",
      question: "What is @Binding used for?",
      options: [
        "Binding views together",
        "Creating two-way connections to state owned by another view",
        "Network data binding",
        "Database binding",
      ],
      correct: 1,
      hint: "This property wrapper creates a two-way connection to data owned elsewhere.",
      explanation:
        "@Binding creates a two-way connection to a value owned by another view, allowing child views to read and modify parent state.",
    },
    {
      id: 158,
      category: "SwiftUI Fundamentals",
      question: "What does @ObservedObject do?",
      options: [
        "Observes user behavior",
        "Subscribes to changes in an ObservableObject",
        "Monitors performance",
        "Tracks view lifecycle",
      ],
      correct: 1,
      hint: "This property wrapper works with objects that conform to ObservableObject.",
      explanation:
        "@ObservedObject subscribes to changes in an ObservableObject, automatically updating the view when the object's @Published properties change.",
    },
    {
      id: 159,
      category: "SwiftUI Fundamentals",
      question: "What is the View protocol in SwiftUI?",
      options: [
        "A protocol for handling view events",
        "The fundamental protocol that all SwiftUI views conform to",
        "A protocol for view controllers",
        "A protocol for custom animations",
      ],
      correct: 1,
      hint: "Every SwiftUI view must conform to this protocol.",
      explanation:
        "The View protocol is the fundamental protocol that all SwiftUI views must conform to, requiring a body property that returns some View.",
    },
    {
      id: 160,
      category: "SwiftUI Fundamentals",
      question: "What does 'some View' mean in SwiftUI?",
      options: [
        "An optional view",
        "An opaque return type that conforms to View",
        "A partial view implementation",
        "A view with some properties",
      ],
      correct: 1,
      hint: "This is an opaque return type that hides the specific view type.",
      explanation:
        "'some View' is an opaque return type that tells the compiler the returned value conforms to View protocol without exposing the exact type.",
    },

    // Modern SwiftUI (176-195)
    {
      id: 176,
      category: "Modern SwiftUI",
      question: "What is the floating tab bar feature in iOS 18?",
      options: [
        "A tab bar that moves around the screen",
        "A tab bar that floats above content and can transform to sidebar",
        "A transparent tab bar",
        "A tab bar with floating animations",
      ],
      correct: 1,
      hint: "This new iOS 18 feature provides more flexible navigation, especially on iPad.",
      explanation:
        "The floating tab bar in iOS 18 floats above content and can seamlessly transform into a sidebar, providing flexible navigation especially on iPad.",
    },
    {
      id: 177,
      category: "Modern SwiftUI",
      question: "What is MeshGradient in iOS 18?",
      options: [
        "A gradient that follows mesh patterns",
        "A two-dimensional gradient using a grid of positioned colors",
        "A gradient for 3D meshes",
        "A gradient with mesh textures",
      ],
      correct: 1,
      hint: "This creates colorful lattice effects by interpolating between grid points.",
      explanation:
        "MeshGradient creates two-dimensional gradients using a grid of positioned colors, interpolating between points to create beautiful lattice effects.",
    },
    {
      id: 178,
      category: "Modern SwiftUI",
      question: "What does .matchedTransitionSource provide?",
      options: [
        "Matched animation timing",
        "Built-in zoom transition support",
        "Matched view controllers",
        "Transition source tracking",
      ],
      correct: 1,
      hint: "This modifier enables smooth zoom transitions between views.",
      explanation:
        ".matchedTransitionSource provides built-in zoom transition support, similar to matchedGeometryEffect but specifically for zoom animations.",
    },
    {
      id: 179,
      category: "Modern SwiftUI",
      question: "What is the @Entry macro in SwiftUI?",
      options: [
        "A macro for app entry points",
        "A macro that simplifies environment and preference key creation",
        "A macro for data entry forms",
        "A macro for view entry animations",
      ],
      correct: 1,
      hint: "This new macro reduces boilerplate code for environment and preference keys.",
      explanation:
        "The @Entry macro simplifies creating environment keys and preference keys, reducing boilerplate code significantly.",
    },
    {
      id: 180,
      category: "Modern SwiftUI",
      question: "How does SwiftUI support Dynamic Island in iOS 18?",
      options: [
        "Through DynamicIslandView protocol",
        "Through .dynamicIsland modifier",
        "Through DynamicIslandController",
        "Through ActivityKit integration",
      ],
      correct: 1,
      hint: "iOS 18 provides direct SwiftUI support for Dynamic Island customization.",
      explanation:
        "iOS 18 introduces .dynamicIsland modifier that allows direct SwiftUI integration with Dynamic Island for customized interactions.",
    },

    // Real-World Applications (196-210)
    {
      id: 196,
      category: "Real-World Applications",
      question: "How do you combine async/await with Combine publishers?",
      options: [
        "You can't combine them",
        "Use .value or .values on publishers",
        "Use async { combine }",
        "Use await publisher.sink",
      ],
      correct: 1,
      hint: "Modern Swift provides bridge properties between Combine and async/await.",
      explanation:
        "You can use .value (for single values) or .values (for async sequences) on Combine publishers to integrate with async/await code.",
    },
    {
      id: 197,
      category: "Real-World Applications",
      question: "What is MVVM pattern in SwiftUI context?",
      options: [
        "Model-View-ViewModel with ObservableObject",
        "Multi-View-Variable-Management",
        "Master-View-Validation-Model",
        "Modern-View-Virtual-Machine",
      ],
      correct: 0,
      hint: "This architectural pattern separates business logic from view logic.",
      explanation:
        "MVVM (Model-View-ViewModel) in SwiftUI uses ObservableObject for ViewModels that manage business logic and state, keeping views declarative.",
    },
    {
      id: 198,
      category: "Real-World Applications",
      question: "How do you test async functions in Swift?",
      options: [
        "You can't test async functions",
        "Use await in test functions marked with async",
        "Use XCTestExpectation only",
        "Convert to sync functions first",
      ],
      correct: 1,
      hint: "XCTest supports async testing with special function signatures.",
      explanation:
        "Mark test functions as async and use await to test async functions directly, or use XCTestExpectation for more complex scenarios.",
    },
    {
      id: 199,
      category: "Real-World Applications",
      question: "What is WebAssembly support in Swift 6.2?",
      options: [
        "Web assembly for UI components",
        "Ability to compile Swift for WebAssembly targets",
        "Web-based Swift development",
        "Assembly language integration",
      ],
      correct: 1,
      hint: "This new Swift 6.2 feature enables deployment to web and other platforms.",
      explanation:
        "Swift 6.2 introduces WebAssembly support, allowing you to compile Swift code for WebAssembly targets for browser and other runtime deployment.",
    },
    {
      id: 200,
      category: "Real-World Applications",
      question: "What is the Subprocess package in Swift 6.2?",
      options: [
        "A package for subclassing processes",
        "A concurrency-friendly API for managing external processes",
        "A package for sub-views",
        "A package for subprocess threading",
      ],
      correct: 1,
      hint: "This new package provides async/await support for process management.",
      explanation:
        "The Subprocess package in Swift 6.2 provides a streamlined, concurrency-friendly API for launching and managing external processes with async/await support.",
    },
    {
      id: 201,
      category: "Real-World Applications",
      question:
        "What are the modern NotificationCenter improvements in Swift 6.2?",
      options: [
        "Faster notification delivery",
        "Type-safe notifications with concrete types instead of strings",
        "More notification types",
        "Better notification UI",
      ],
      correct: 1,
      hint: "This eliminates the need for string-based notification names and untyped payloads.",
      explanation:
        "Swift 6.2's NotificationCenter uses concrete notification types with stored properties instead of string names and untyped dictionaries.",
    },
    {
      id: 202,
      category: "Real-World Applications",
      question: "How do MainActorMessage and AsyncMessage work?",
      options: [
        "They handle message passing",
        "They specify whether notifications are posted synchronously or asynchronously",
        "They manage message queues",
        "They handle async messaging",
      ],
      correct: 1,
      hint: "These protocols help eliminate concurrency errors with notifications.",
      explanation:
        "MainActorMessage and AsyncMessage protocols specify whether notifications are posted synchronously on main actor or asynchronously, preventing concurrency errors.",
    },
    {
      id: 203,
      category: "Real-World Applications",
      question: "What is strict memory safety mode in Swift 6.2?",
      options: [
        "Automatic memory management",
        "Opt-in mode that flags uses of unsafe constructs",
        "Memory optimization mode",
        "Strict type checking",
      ],
      correct: 1,
      hint: "This optional mode is designed for security-critical projects.",
      explanation:
        "Strict memory safety is an opt-in mode that flags uses of unsafe constructs like unsafe pointers, ideal for security-critical projects.",
    },
    {
      id: 204,
      category: "Real-World Applications",
      question: "What are the VS Code Swift extension improvements?",
      options: [
        "Better syntax highlighting only",
        "Background indexing, LLDB debugging, and live DocC preview",
        "Faster compilation only",
        "Better autocomplete only",
      ],
      correct: 1,
      hint: "The official Swift extension includes several productivity features.",
      explanation:
        "The official Swift VS Code extension includes background indexing, built-in LLDB debugging, Swift project panel, and live DocC preview.",
    },
    {
      id: 205,
      category: "Real-World Applications",
      question: "What are exit tests in Swift Testing?",
      options: [
        "Tests that exit the app",
        "Tests that verify code terminates under specific conditions",
        "Tests that test exit strategies",
        "Tests that run when exiting",
      ],
      correct: 1,
      hint: "These new tests help verify failure conditions and preconditions.",
      explanation:
        "Exit tests verify that code terminates under specific conditions like failed preconditions, running in a new process to validate exit behavior.",
    },
    {
      id: 206,
      category: "Real-World Applications",
      question: "What are attachments in Swift Testing?",
      options: [
        "File attachments to tests",
        "Additional context in test results like images and logs",
        "Test dependencies",
        "External test resources",
      ],
      correct: 1,
      hint: "These help provide additional context for diagnosing test failures.",
      explanation:
        "Attachments in Swift Testing allow including additional context like strings, images, logs, and artifacts in test results for better failure diagnosis.",
    },
    {
      id: 207,
      category: "Real-World Applications",
      question: "What is the Observations async sequence in Swift 6.2?",
      options: [
        "A sequence for observing user actions",
        "Streaming transactional state changes of observable types",
        "A sequence for UI observations",
        "A sequence for network observations",
      ],
      correct: 1,
      hint: "This helps with reactive programming and avoiding redundant UI updates.",
      explanation:
        "The Observations async sequence streams transactional state changes of observable types, helping avoid redundant UI updates and improving performance.",
    },
    {
      id: 208,
      category: "Real-World Applications",
      question: "How do package traits work in Swift 6.1+?",
      options: [
        "They define package characteristics",
        "They allow packages to offer different APIs in specific environments",
        "They optimize package performance",
        "They manage package dependencies",
      ],
      correct: 1,
      hint: "This feature enables conditional compilation and optional dependencies.",
      explanation:
        "Package traits allow packages to offer different APIs and features in specific environments like Embedded Swift and WebAssembly.",
    },
    {
      id: 209,
      category: "Real-World Applications",
      question: "What is background indexing in Swift 6.1?",
      options: [
        "Indexing that happens in background threads",
        "SwiftPM projects get indexed continuously without requiring builds",
        "Database indexing for Swift projects",
        "File system indexing",
      ],
      correct: 1,
      hint: "This improves editor features like jump-to-definition without waiting for builds.",
      explanation:
        "Background indexing enables continuous indexing of SwiftPM projects without requiring builds, keeping editor features like jump-to-definition always current.",
    },
    {
      id: 210,
      category: "Real-World Applications",
      question: "What makes Swift 6.2 different from previous major releases?",
      options: [
        "Complete rewrite of the language",
        "Focus on productivity with approachable concurrency and enhanced tooling",
        "New syntax for all features",
        "Removal of legacy features",
      ],
      correct: 1,
      hint: "This release emphasizes making concurrent programming more accessible and improving developer workflows.",
      explanation:
        "Swift 6.2 focuses on developer productivity with approachable concurrency features, enhanced tooling, and streamlined workflows rather than major syntax changes.",
    },
  ];

  // State management
  const [currentSet, setCurrentSet] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const [showHints, setShowHints] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questionsPerSet = 3;
  const totalSets = Math.ceil(questions.length / questionsPerSet);

  // Get current questions for the set
  const getCurrentQuestions = () => {
    const startIndex = currentSet * questionsPerSet;
    return questions.slice(startIndex, startIndex + questionsPerSet);
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId, answerIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  // Toggle hint visibility
  const toggleHint = (questionId) => {
    setShowHints((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  // Reveal correct answer
  const revealAnswer = (questionId) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [questionId]: true,
    }));
  };

  // Navigation functions
  const goToPreviousSet = () => {
    if (currentSet > 0) {
      setCurrentSet(currentSet - 1);
    }
  };

  const goToNextSet = () => {
    if (currentSet < totalSets - 1) {
      setCurrentSet(currentSet + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  // Calculate score
  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question) => {
      if (userAnswers[question.id] === question.correct) {
        correct++;
      }
    });
    return correct;
  };

  // Reset quiz
  const resetQuiz = () => {
    setCurrentSet(0);
    setUserAnswers({});
    setRevealedAnswers({});
    setShowHints({});
    setQuizCompleted(false);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Quiz completion screen
  if (quizCompleted) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div
        className={`max-w-4xl mx-auto p-6 rounded-lg shadow-lg transition-colors duration-300 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
        }`}
      >
        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              darkMode
                ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
            }`}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1
            className={`text-3xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Quiz Complete!
          </h1>
          <div className="text-6xl font-bold text-blue-600 mb-2">
            {percentage}%
          </div>
          <div
            className={`text-xl mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            You scored {score} out of {questions.length} questions
          </div>

          <div
            className={`rounded-lg p-6 mb-6 ${
              darkMode ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            <h2
              className={`text-xl font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Performance Breakdown
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {[
                "Swift Fundamentals",
                "Functions & Closures",
                "Value vs Reference Types",
                "Functional Programming",
                "Async/Await Fundamentals",
                "Advanced Concurrency",
                "Modern Concurrency Features",
                "Combine Basics",
                "Advanced Combine",
                "Combine Integration",
                "SwiftUI Fundamentals",
                "Modern SwiftUI",
                "Real-World Applications",
              ].map((category) => {
                const categoryQuestions = questions.filter(
                  (q) => q.category === category
                );
                const categoryScore = categoryQuestions.filter(
                  (q) => userAnswers[q.id] === q.correct
                ).length;
                const categoryPercentage = Math.round(
                  (categoryScore / categoryQuestions.length) * 100
                );

                return (
                  <div
                    key={category}
                    className={`flex justify-between ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <span>{category}:</span>
                    <span className="font-medium">
                      {categoryScore}/{categoryQuestions.length} (
                      {categoryPercentage}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center mx-auto"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQuestions = getCurrentQuestions();

  return (
    <div
      className={`max-w-4xl mx-auto p-6 rounded-lg shadow-lg transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      {/* Dark Mode Toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-lg transition-colors duration-300 ${
            darkMode
              ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
              : "bg-gray-100 hover:bg-gray-200 text-gray-600"
          }`}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1
          className={`text-3xl font-bold mb-2 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Swift & SwiftUI Mastery Quiz
        </h1>
        <div
          className={`text-lg mb-4 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          210 Questions • Latest Swift 6.2 & iOS 18 Features
        </div>
        <div
          className={`rounded-lg p-4 ${
            darkMode ? "bg-gray-800" : "bg-blue-50"
          }`}
        >
          <div
            className={`flex justify-between items-center text-sm mb-2 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <span>
              Set {currentSet + 1} of {totalSets}
            </span>
            <span>
              Questions {currentSet * questionsPerSet + 1}-
              {Math.min((currentSet + 1) * questionsPerSet, questions.length)}
            </span>
          </div>
          <div
            className={`w-full rounded-full h-2 ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSet + 1) / totalSets) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-8">
        {currentQuestions.map((question, index) => (
          <div
            key={question.id}
            className={`border rounded-lg p-6 transition-colors duration-300 ${
              darkMode
                ? "border-gray-700 bg-gray-800"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="text-sm text-blue-600 font-medium mb-2">
                  {question.category} • Question {question.id}
                </div>
                <h3
                  className={`text-lg font-semibold mb-4 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {question.question}
                </h3>
              </div>
              <button
                onClick={() => toggleHint(question.id)}
                className={`ml-4 p-2 transition-colors ${
                  darkMode
                    ? "text-gray-400 hover:text-blue-400"
                    : "text-gray-400 hover:text-blue-500"
                }`}
                title="Show hint"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Hint */}
            {showHints[question.id] && (
              <div
                className={`border rounded-lg p-3 mb-4 transition-colors duration-300 ${
                  darkMode
                    ? "bg-yellow-900 border-yellow-700 text-yellow-200"
                    : "bg-yellow-50 border-yellow-200 text-yellow-800"
                }`}
              >
                <div className="text-sm">
                  <strong>Hint:</strong> {question.hint}
                </div>
              </div>
            )}

            {/* Options */}
            <div className="space-y-3 mb-4">
              {question.options.map((option, optionIndex) => {
                const isSelected = userAnswers[question.id] === optionIndex;
                const isCorrect = optionIndex === question.correct;
                const isRevealed = revealedAnswers[question.id];

                let buttonClass =
                  "w-full text-left p-3 rounded-lg border transition-all ";

                if (isRevealed) {
                  if (isCorrect) {
                    buttonClass += darkMode
                      ? "bg-green-900 border-green-700 text-green-200"
                      : "bg-green-50 border-green-300 text-green-800";
                  } else if (isSelected && !isCorrect) {
                    buttonClass += darkMode
                      ? "bg-red-900 border-red-700 text-red-200"
                      : "bg-red-50 border-red-300 text-red-800";
                  } else {
                    buttonClass += darkMode
                      ? "bg-gray-800 border-gray-600 text-gray-400"
                      : "bg-gray-50 border-gray-200 text-gray-500";
                  }
                } else if (isSelected) {
                  buttonClass += darkMode
                    ? "bg-blue-900 border-blue-700 text-blue-200"
                    : "bg-blue-50 border-blue-300 text-blue-800";
                } else {
                  buttonClass += darkMode
                    ? "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50";
                }

                return (
                  <button
                    key={optionIndex}
                    onClick={() =>
                      !isRevealed &&
                      handleAnswerSelect(question.id, optionIndex)
                    }
                    className={buttonClass}
                    disabled={isRevealed}
                  >
                    <div className="flex items-center">
                      <span className="w-6 h-6 rounded-full border flex items-center justify-center text-xs font-medium mr-3">
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      <span>{option}</span>
                      {isRevealed && isCorrect && (
                        <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                      )}
                      {isRevealed && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Reveal Answer Button */}
            {userAnswers[question.id] !== undefined &&
              !revealedAnswers[question.id] && (
                <button
                  onClick={() => revealAnswer(question.id)}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-300"
                >
                  Reveal Correct Answer
                </button>
              )}

            {/* Explanation */}
            {revealedAnswers[question.id] && (
              <div
                className={`mt-4 border rounded-lg p-4 transition-colors duration-300 ${
                  darkMode
                    ? "bg-blue-900 border-blue-700 text-blue-200"
                    : "bg-blue-50 border-blue-200 text-blue-800"
                }`}
              >
                <div className="text-sm">
                  <strong>Explanation:</strong> {question.explanation}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div
        className={`flex justify-between items-center mt-8 pt-6 border-t transition-colors duration-300 ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <button
          onClick={goToPreviousSet}
          disabled={currentSet === 0}
          className={`flex items-center px-4 py-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
            darkMode
              ? "text-gray-400 hover:text-blue-400"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Previous Set
        </button>

        <div
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          Set {currentSet + 1} of {totalSets}
        </div>

        <button
          onClick={goToNextSet}
          className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
        >
          {currentSet === totalSets - 1 ? "Finish Quiz" : "Next Set"}
          <ChevronRight className="w-5 h-5 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default SwiftQuiz;
