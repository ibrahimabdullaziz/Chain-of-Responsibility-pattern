using System;

public class Engine
{
    public string type;
    public int horsepower;

    public Engine(string type, int horsepower)
    {
        this.type = type;
        this.horsepower = horsepower;
    }
}

public class Car
{
    public string brand;
    public string color;
    public Engine engine;

    public Car(string brand, string color, Engine engine)
    {
        this.brand = brand;
        this.color = color;
        this.engine = engine;
    }

    public Car ShallowCopy()
    {
        return new Car(this.brand, this.color, this.engine);
    }

    public Car DeepCopy()
    {
        Engine newEngine = new Engine(this.engine.type, this.engine.horsepower);
        return new Car(this.brand, this.color, newEngine);
    }

    public void Print()
    {
        Console.WriteLine($"Brand: {brand} | Color: {color} | Engine: {engine.type} | HP: {engine.horsepower}");
    }
}

public class Program
{
    static void Main()
    {
        Console.WriteLine("--- Shallow Copy Demonstration ---");

        Car car1 = new Car("Toyota", "Red", new Engine("V6", 300));
        Car car2 = car1.ShallowCopy();

        car2.engine.horsepower = 999;

        Console.Write("Original Car (car1) -> ");
        car1.Print();
        Console.Write("Shallow Copy (car2) -> ");
        car2.Print();

        Console.WriteLine("\n--- Deep Copy Demonstration ---");

        Car car3 = new Car("BMW", "Black", new Engine("V8", 400));
        Car car4 = car3.DeepCopy();

        car4.engine.horsepower = 888;

        Console.Write("Original Car (car3) -> ");
        car3.Print();
        Console.Write("Deep Copy    (car4) -> ");
        car4.Print();
    }
}