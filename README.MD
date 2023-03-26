# Simulation of the Single-Instruction-Multiple-Data (SIMD) concept
The TC39 committee have, for good reason, ceased active development and relegated SIMD.js/SIMD API from Stage 3.
This sampler project was created to demonstrate the general concept and might be useful.

[According to Wikipedia](https://en.wikipedia.org/wiki/Single_instruction,_multiple_data):
> Single instruction, multiple data (SIMD) is a type of parallel processing in Flynn's taxonomy. SIMD can be internal (part of the hardware design) and it can be directly accessible through an instruction set architecture (ISA), but it should not be confused with an ISA. SIMD describes computers with multiple processing elements that perform the same operation on multiple data points simultaneously. 

In brief, SIMD is typically implemented at the processor (hardware) level to gain more efficiency but that is not to say the concept does not have utility if implemented at the code level. The mechanism is quite straightforward when implemented using the relatively new (ES2020) `allSettled` method of the JS Promise object.

## How the utility works

The `simd` function taken as its only argument the _instruction_ (function) to be performed on the data and returns a new (reusable) function, specialised for SIMD operation.

The SIMD function expects multiple data items that are converted into an array using the [rest operator `...`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters). The instruction is then used as the call-back of the [map method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) over the data array with a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) being returned for each call.

The [Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) method is then used on the resultant array to await completion of all the function calls, being processed in a (near) parallel manner.

## NB (_nota bene_ “mark well")
This is only a simulation of what (to my understand, which might be wrong) SIMD does. It enables a _single instruction_ to be applied over _multiple data_ items (which is like the array map method but with all operations performed) in parallel.
This is not a candidate solution or even a possible polyfil. It is an experiment for educational purposes, that might have utility in production (given sufficient testing).

As an educational experiment is demonstrated how functions can be performed in near parallel manner and how the allSettled method is used to gather the result irespective of the success or failure of each operation.

The two stage calling mechanism employs the functional programming concept of [partial application](https://en.wikipedia.org/wiki/Partial_application) that enables the _instruction_ to be converted into a Promise-base SIMD-like operation. The operation can then be called several times without the need to instrument the instruction each time.

The rest operator is used inside the _simd_ function so as much data as is available at the time can be processed at the same time.

### Purpose (use case)
Imagine you have a process that is receiving data via a stream. The amount of data in any given time frame is uncertain but at a regular interval you want all the unprocesed data received to that point, to be processed. This SIMD implementation can produce a function that can take an array of all the unprocessed data and (if called using the [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)) can execute the function on all that data in parallel.