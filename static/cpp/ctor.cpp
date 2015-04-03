// The purpose of this article is to give an example and explanation for
// every variation and special case of C++ constructors, on one page, uncluttered
// by [apologetics][FAQLC] or criticism[FQALC]. The fact is you need to know this 
// stuff and it only takes a few minutes to "get it," so why not just learn it?
// 
// [FAQLC]: http://www.parashift.com/c++-faq-lite/ctors.html
// [FQALC]: http://yosefk.com/c++fqa/ctors.html
// 
// Download
// --------
// * [ctor.cpp][CTOR]
// 
// This is a literate program which contains the full text of this article in 
// the comments and also runs examples of the topics discussed in this article.  It
// can be compiled and run like so:
// 
//     g++ ctor.cpp -o ctor; ./ctor
// 
// [CTOR]:/static/cpp/ctor.cpp
//
// Sample Classes
// --------------
// Let's set up some classes that do output during construction and destruction so
// show what's going on.  We'll be using these classes for all examples.

#include <iostream>
class A {
    int id;
public:
    A(): id(0) {
        std::cout << "default constructor called, id = " << id << std::endl;
    }

    A(int id): id(id) {
        std::cout << "one argument constructor called, id = " << id << std::endl;
    }

    A(int id, int unsaved): id(id) {
        std::cout << "two argument constructor called, " <<
            "id = " << id << 
            ", unsaved = " << unsaved << 
            std::endl;
    }

    A(const A& other): id(other.id) {
        std::cout << "copy constructor called, id = " << id << std::endl;
    }

    const A& operator=(const A& other) {
        id = other.id;
        std::cout << "assignment called, id = " << id << std::endl;
    }

    bool operator==(const A& other) {
        std::cout << "comparing A(" << id << ") to A(" << other.id << ")" << std::endl;
        return id == other.id;
    }

    ~A() {
        std::cout << "destructor called, id = " << id << std::endl;
    }
};

// Another, essentially identical class B that we'll use for examples needing multiple classes.
// The fact that B is a subclass of A is not used; that's just a trick to re-use the implementation.
class B: public A {};

// We'll also need a couple of functions so we can see what happens when we pass
// by value or reference.

void passByValue(const A x) {
    // ...
}

void passByReference(const A& x ) {
    // ..
}

// Default Constructor
// -------------------
// There's one thing you need to know about default constructors before we start: one
// will be written for you if your class has no constructors whatsoever.  If
// you provide any other constructor, then you'll have to supply a default
// constructor yourself, assuming you want your class to still be default constructable.
// 
// You do this like so:

class C {
public:
	C() {}
};

// That will behave exactly like the default constructor the compiler writes for
// you.  If you want to hide the implementation or avoid haing the default
// constructor be implicitly inline, write this:

class D {
public:
	D();
};
D::D() {}

// Of course, you are free to write a non-trivial default constructor; this
// merely illustrates how to mimic the automatically written one.

int main(void) {

// Ok, let's do some examples.  
// This calls the default (sometimes called nullary) constructor:

    A x;

// Note the lack of parentheses.

// But *this*:

    std::cout << "about to declare f..."  << std::endl;
    A f();
    std::cout << "see? no constructors are invoked."  << std::endl;

// does NOT call the default constructor, or even define a
// variable of type A at all.  In fact, it creates an unitialized function 
// pointer to a nullary function and returning an object of type A.
//
// The rule is simple: to declare an object and initialize it with its default constructor, *don't* use parentheses.

// Copy Constructor
// ----------------
// A copy constructor accepts a single argument of the same type as the class, usually a const reference:
//
//     A(const A& other);
// 
// You can call it directly, like so:

    A y = x;

// The copy constructor is also used to pass objects by value to functions:

    passByValue(x);

// The copy constructor is special because it is called by C++ whenever it's necessary
// to make a copy, such as passing arguments by value or returning a value.
// Also, an implementation may optimize away calls to the copy constructor
// when it is safe to do so.  So, this usually performs only a single copy:

    std::cout << "how may copies do you see here?" << std::endl;
    A q = A(A(A(x)));
    std::cout << "I see one with g++." << std::endl;

// These rules make sense for normal copy operations, but not for unusual copy semantics,
// so it pays to implement a straight-forward, predictable copy constructor
// and implement weird copies in a different method, say `clone()` or `deepCopy()`.

// Other Unary Constructors
// ------------------------
// These next two are equivalent, and both invoke only the unary (1-argument) constructor:

    A one = A(1);
    A two(2);

// There's nothing special about the int type, here.  This is a general,
// alternative syntax for invoking a unary (1-argument) constructor.
//
// Like the two previous statements, this also invokes the unary constructor.

    A three = 3;

// However, that's only true because that constructor wasn't marked explicit.  It it had been,
// then it wouldn't have compiled: this is an *implicit* conversion between an int and A.
//
// There's another way to perform an implicit conversion: pass an int into a function (or
// other operator) where an A is expected:

    passByValue(4);
    passByReference(5);

// These creates a temporary object of type A, and this is what is *actually* passed to
// the function.  Again, this only works for implicit unary constructors.  (An implicit
// constructor is one declared without the `explicit` keyword.)
//
// this creates a inline, temporary object which is destroyed at the end of the statement.

    A(4);

// you can use such temporary objects in expressions:

    std::cout << std::boolalpha << (A(5) == A(6)) << std::endl;

// but be aware that they are automatically `const`.
//
// to create a temporary object using the default constructor, you *must* use parentheses:

    std::cout << std::boolalpha << (A() == A()) << std::endl;

// note this is exactly opposite of the non-temporary case show above, where you must 
// *never* use parantheses.
//
// this creates a temporary object initialized with 6, assigns y to that temporary
// object, then destroys the temporary.  Note that y was declared above.

    y = A(7);

// This appears to construct a temporary, copy construct z from that temporary,
// then destroy the temporary.  In fact, it's an alternate syntax for invoking
// the A(int) constructor.  We'll need that fact in a second.

    A z = A(8);

// If It Quacks Like a Function Declaration...
// -------------------------------------------
// Be aware of this case:

    std::cout << "about to declare g..."  << std::endl;
    A g( A() );

// This looks like it should default construct a temporary of type A, then copy construct g.  
// In fact, it declares a function pointer called g.

    std::cout << "see? no constructors are invoked."  << std::endl;

// The ambiguity is introduced because the declaration of g *could* be a function declaration
// (although you have to squint to see it) and the standard says that anything that CAN be 
// interpreted as a function declaration WILL be interpreted as a function declaration.
//
// We can avoid this using the alternate `A x = A()` syntax:

    A w = A(B());

// This in fact default constructs a temporary B then copy constructs w from it.
// It does NOT call the assignment operator.
//
// Binary and Beyond
// -----------------
// From higher arity, things are easier. Only the default and unary constructors have special cases.
//
// This calls the binary (2-argument) constructor.

    A x2(9,1);

// This calls the binary constructor to create a temporary, which is immediately destroyed.

    A(10,2);

// And so, on, with higher arity constructors having equally regular and consistent syntax.

    std::cout << std::endl << "This is the end of the program, so now you'll " <<
        "see all the destructors for non-temporary objects being invoked " <<
        "in reverse order of construction." << std::endl;

    return 0;
}
