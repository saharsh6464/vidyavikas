export const questionsData = [
  {
    id: 1,
    title: "Add Two Numbers",
    description: "Given two integers, `a` and `b`, write a function to calculate and return their sum. This task is fundamental to understanding basic arithmetic operations in programming.",
    difficulty: "Easy",
    avgTime: "5 min",
    complexity: {
      time: "O(1)",
      space: "O(1)",
    },
    containerClass: "container",
    codeTemplate: {
      python: {
        functionSignature: `def add_two_numbers(a, b):\n  # Implement your function here\n  pass`,
        mainFunction: `if __name__ == "__main__":\n  print(add_two_numbers`,
        mainFunction2: `  # Expected output: 5`,
      },
      java: {
        functionSignature: `public class Main {\n  public static int addTwoNumbers(int a, int b) {\n    // Implement your function here\n  }\n}`,
        mainFunction: `public class Main {\n  public static void main(String[] args) {\n    System.out.println(Main.addTwoNumbers`,
        mainFunction2: `(2, 3)); // Expected output: 5\n  }\n}`,
      },
      c: {
        functionSignature: `#include <stdio.h>\n\nint add_two_numbers(int a, int b) {\n  // Implement your function here\n  return 0; // Placeholder\n}`,
        mainFunction: `#include <stdio.h>\n\nint main() {\n  printf("%d\\n", add_two_numbers`,
        mainFunction2: `);   return 0;\n}`,
      },
      cpp: {
        functionSignature: `#include <iostream>\n\nint add_two_numbers(int a, int b) {\n  // Implement your function here\n  return 0; // Placeholder\n}`,
        mainFunction: `#include <iostream>\n\nint main() {\n  std::cout << add_two_numbers`,
        mainFunction2: `(2, 3) << std::endl; // Expected output: 5\n  return 0;\n}`,
      },
      javascript: {
        functionSignature: `function addTwoNumbers(a, b) {\n  // Implement your function here\n  return 0; // Placeholder\n}`,
        mainFunction: `console.log(addTwoNumbers`,
        mainFunction2: `(2, 3)); // Expected output: 5`,
      },
    },
    testCases: [
      {
        example: "Example 1",
        input: "[2, 3]",
        output: "5",
        explanation: "Adding 2 and 3 results in 5.",
      },
      {
        example: "Example 2",
        input: "[-1, 5]",
        output: "4",
        explanation: "Adding -1 and 5 results in 4.",
      },
      {
        example: "Example 3",
        input: "[0, 0]",
        output: "0",
        explanation: "Adding 0 and 0 results in 0.",
      },
      {
        example: "Example 4",
        input: "[100, 200]",
        output: "300",
        explanation: "Adding 100 and 200 results in 300.",
      },
    ],
},
  {
    id: 2,
    Array:false,
    title: "Largest Number Among Two",
    description: "Given two numerical inputs, determine and return the larger of the two. If both numbers are equal, you can return either one. This problem tests your ability to use conditional logic to compare values.",
    difficulty: "Easy",
    avgTime: "7 min",
    complexity: {
      time: "O(1)",
      space: "O(1)",
    },
    containerClass: "container-md",
    codeTemplate: {
      python: {
        functionSignature: `def largest_number(a, b):\n  # Implement your function here\n  pass`,
        mainFunction: `if __name__ == "__main__":\n  print(largest_number(10, 20))  # Expected output: 20`,
      },
      java: {
        functionSignature: `public class Main {\n  public static int largestNumber(int a, int b) {\n    // Implement your function here\n  }\n}`,
        mainFunction: `public class Main {\n  public static void main(String[] args) {\n    System.out.println(Main.largestNumber(10, 20)); // Expected output: 20\n  }\n}`,
      },
      c: {
        functionSignature: `#include <stdio.h>\n\nint largest_number(int a, int b) {\n  // Implement your function here\n  return 0; // Placeholder\n}`,
        mainFunction: `#include <stdio.h>\n\nint main() {\n  printf("%d\\n", largest_number`,
        mainFunction2: `);  return 0;\n}`,
      },
      cpp: {
        functionSignature: `#include <iostream>\n\nint largest_number(int a, int b) {\n  // Implement your function here\n  return 0; // Placeholder\n}`,
        mainFunction: `#include <iostream>\n\nint main() {\n  std::cout << largest_number(10, 20) << std::endl; // Expected output: 20\n  return 0;\n}`,
      },
      javascript: {
        functionSignature: `function largestNumber(a, b) {\n  // Implement your function here\n  return 0; // Placeholder\n}`,
        mainFunction: `console.log(largestNumber(10, 20)); // Expected output: 20`,
      },
    },
    testCases: [
      {
        example: "Example 1",
        input: "[10, 20]",
        output: "20",
        explanation: "20 is larger than 10.",
      },
      {
        example: "Example 2",
        input: "[5, 5]",
        output: "5",
        explanation: "Both numbers are equal, so 5 is returned.",
      },
      {
        example: "Example 3",
        input: "[-10, -5]",
        output: "-5",
        explanation: "-5 is larger than -10.",
      },
      {
        example: "Example 4",
        input: "[100, 50]",
        output: "100",
        explanation: "100 is larger than 50.",
      },
    ],
  },
  {
    id: 3,
    Array:true,
    title: "Linear Search",
    description: "Given an array of integers and a target value, implement a linear search algorithm to find the index of the target. If the target is not found within the array, return -1. Linear search is a basic search algorithm that sequentially checks each element until a match is found or the entire array has been searched.",
    difficulty: "Medium",
    avgTime: "10 min",
    complexity: {
      time: "O(n)",
      space: "O(1)",
    },
    containerClass: "container-lg",
    codeTemplate: {
      python: {
        functionSignature: `def linear_search(arr, target):\n  # Implement your function here\n  pass`,
        mainFunction: `if __name__ == "__main__":\n  print(linear_search`,
        mainFunction2: `) # Expected output: 2`
      },
      java: {
        functionSignature: ` public static int linearSearch(int[] arr, int target) {\n    // Implement your function here\n    return -1; // Placeholder\n  }\n`,
        mainFunction: `\n\npublic static void main(String[] args) {`,
        dec: ``,
        mainfunctionb: `\n  System.out.println(Main.linearSearch`,
        mainFunction2: `); \n  }\n}`
      },
      c: {
        functionSignature: `#include <stdio.h>\n\nint linear_search(int arr[], int size, int target) {\n  // Implement your function here\n  return -1; // Placeholder\n}`,
        mainFunction: `#include <stdio.h>\n\nint main() {`,
        dec: ``,
        mainfunctionb: `\n  printf("%d", linear_search`,
        mainFunction2: `); return 0;\n}`
      },
      cpp: {
        functionSignature: `#include <iostream>\n\nint linear_search(int arr[], int size, int target) {\n  // Implement your function here\n  return -1; // Placeholder\n}`,
        mainFunction: `\n\nint main() {`,
        dec:``,
        mainfunctionb: `\n  std::cout << linear_search`,
        mainFunction2:` << std::endl;\n}`, // Expected output: 2\n  return 0;\n}`,
      },
      javascript: {
        functionSignature: `function linearSearch(arr, target) {\n  // Implement your function here\n  return -1; // Placeholder\n}`,
        mainFunction: `console.log(linearSearch([1, 2, 3, 4, 5], 3)); // Expected output: 2`,
      },
    },
    testCases:  [
  {
    example: "Example 1",
    input: "[[1, 2, 3, 4, 5], 5, 3]",
    output: "2",
    explanation: "The target 3 is found at index 2.",
  },
  {
    example: "Example 2",
    input: "[[10, 20, 30, 40], 4, 25]",
    output: "-1",
    explanation: "The target 25 is not found in the array.",
  },
  {
    example: "Example 3",
    input: "[[5, 6, 7, 8, 9], 5, 9]",
    output: "4",
    explanation: "The target 9 is found at index 4.",
  },
  {
    example: "Example 4",
    input: "[[-1, -2, -3, -4], 4, -3]",
    output: "2",
    explanation: "The target -3 is found at index 2.",
  },
],
  },
  {
    id: 4,
    Array: false,
    title: "Multiply Two Numbers",
    description: "Given two integers, `a` and `b`, write a function to calculate and return their product. This problem tests your understanding of basic multiplication operations.",
    difficulty: "Easy",
    avgTime: "6 min",
    complexity: {
        time: "O(1)",
        space: "O(1)",
    },
    containerClass: "container",
    codeTemplate: {
        python: {
            functionSignature: `def multiply_two_numbers(a, b):\n\t# Implement your function here\n\tpass`,
            mainFunction: `if __name__ == "__main__":\n\tprint(multiply_two_numbers`,
            mainFunction2: `\t# Expected output: 6`,
        },
        java: {
            functionSignature: `public class Main {\n\tpublic static int multiplyTwoNumbers(int a, int b) {\n\t\t// Implement your function here\n\t}\n}`,
            mainFunction: `public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println(Main.multiplyTwoNumbers`,
            mainFunction2: `(2, 3)); // Expected output: 6\n\t}\n}`,
        },
        c: {
            functionSignature: `#include <stdio.h>\n\nint multiply_two_numbers(int a, int b) {\n\t// Implement your function here\n\treturn 0; // Placeholder\n}`,
            mainFunction: `\nint main() {\n\tprintf("%d\\n", multiply_two_numbers`,
            mainFunction2: `); \treturn 0;\n}`,
        },
        cpp: {
            functionSignature: `#include <iostream>\n\nint multiply_two_numbers(int a, int b) {\n\t// Implement your function here\n\treturn 0; // Placeholder\n}`,
            mainFunction: `#include <iostream>\n\nint main() {\n\tstd::cout << multiply_two_numbers`,
            mainFunction2: `(2, 3) << std::endl; // Expected output: 6\n\treturn 0;\n}`,
        },
        javascript: {
            functionSignature: `function multiplyTwoNumbers(a, b) {\n\t// Implement your function here\n\treturn 0; // Placeholder\n}`,
            mainFunction: `console.log(multiplyTwoNumbers`,
            mainFunction2: `(2, 3)); // Expected output: 6`,
        },
    },
    testCases: [
        {
            example: "Example 1",
            input: "[2, 3]",
            output: "6",
            explanation: "Multiplying 2 and 3 results in 6.",
        },
        {
            example: "Example 2",
            input: "[-1, 5]",
            output: "-5",
            explanation: "Multiplying -1 and 5 results in -5.",
        },
        {
            example: "Example 3",
            input: "[0, 10]",
            output: "0",
            explanation: "Multiplying 0 and 10 results in 0.",
        },
        {
            example: "Example 4",
            input: "[10, 10]",
            output: "100",
            explanation: "Multiplying 10 and 10 results in 100.",
        },
    ],
},

];