using System;

public class Engine
{
    public string type;
    public int hp;

    public Engine(string type, int hp)
    {
        this.type = type;
        this.hp = hp;
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
        Car newCar = new Car(this.brand, this.color, this.engine);
        return newCar;
    }

    public Car DeepCopy()
    {
        Engine newEngine = new Engine(this.engine.type, this.engine.hp);

        Car newCar = new Car(this.brand, this.color, newEngine);
        return newCar;
    }

    public void Print()
    {
        Console.WriteLine("brand: " + brand + " | color: " + color + " | engine type: " + engine.type + " | hp: " + engine.hp);
    }
}

public class Program
{
    static void Main()
    {
        Console.WriteLine("== Shallow Copy ==");

        Car car1 = new Car("Toyota", "Red", new Engine("V6", 300));
        Car car2 = car1.ShallowCopy();

        car2.engine.hp = 999;

        Console.WriteLine("car1 (الاصل) => ");
        car1.Print();
        Console.WriteLine("car2 (النسخة) => ");
        car2.Print();

        Console.WriteLine();

        Console.WriteLine("== Deep Copy ==");

        Car car3 = new Car("BMW", "Black", new Engine("V8", 400));
        Car car4 = car3.DeepCopy();

        car4.engine.hp = 999;
      
        Console.WriteLine("car3 (الاصل) => ");
        car3.Print();
        Console.WriteLine("car4 (النسخة) => ");
        car4.Print();
    }
}