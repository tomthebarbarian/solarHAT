-- Users table seeds here (Example)
-- INSERT INTO users (name) VALUES ('Alice');
-- INSERT INTO users (name) VALUES ('Kira');
-- INSERT INTO owners (name, email, password)
--     VALUES ('Devin Sanders', 'tristanjacobs@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO users (name,phone)VALUES ('mary','647-322-5656');
INSERT INTO users (name,phone)VALUES ('ali',4169232121);
INSERT INTO users (name,phone)VALUES ('rose',416233211);
INSERT INTO categories (name) VALUES ('appetizer');
INSERT INTO categories (name) VALUES ('soup');
INSERT INTO categories (name) VALUES ('salad');
INSERT INTO categories (name) VALUES ('beef');
INSERT INTO categories (name) VALUES ('poultry');
INSERT INTO categories (name) VALUES ('kids');
INSERT INTO categories (name) VALUES ('deserts');
INSERT INTO categories (name) VALUES ('drinks');


INSERT INTO items (name,description,cal,category_id,url,price) VALUES ('mushroom soup','basic roux is thinned with cream or milk and then mushrooms and/or mushroom broth are added',39,2,'/images/mushroom.jpg',399);
INSERT INTO items (name,description,cal,category_id,url,price) VALUES ('lentil soup','is a soup based on lentils; it may be vegetarian or include meat, and may use brown, red, yellow, green or black lentils',56,2,'/images/lentil.jpg',499);

INSERT INTO items (name,description,cal,category_id,url,price) VALUES ('caeser salad',' romaine lettuce and croutons dressed with lemon juice, olive oil, egg, Worcestershire sauce, anchovies, garlic, Dijon mustard, Parmesan cheese, and black pepper',44,3,'/images/Caeser.jpg',599);

INSERT INTO items (name,description,cal,category_id,url,price) VALUES ('Fattoush salad',' Levantine salad made from toasted or fried pieces of khubz combined with mixed greens and other vegetables, such as radishes and tomatoes',159,3,'/images/fattoush.jpg',399);

INSERT INTO items (name,description,cal,category_id,url,price) VALUES ('kabab',' cooked meat dish, with its origins in Middle Eastern cuisine.',144.8,4,'/images/kabab.jpg',899);
INSERT INTO items (name,description,cal,category_id,url,price) VALUES ('burger','  ground meat, typically beef—placed inside a sliced bread roll or bun.',225,4,'/images/photo-1512152272829-e3139592d56f.jpeg',799);

INSERT INTO items (name,description,cal,category_id,url,price) VALUES ('pizza',' Dough, sauce (usually tomato sauce), cheese ',309,4,'/images/pizza.jpg',699);
INSERT INTO items (name,description,cal,category_id,url,price) VALUES ('chicken scallop','fried chicken breast',343.9,5,'/images/chicken.jpg',799);

INSERT INTO items (name,description,cal,category_id,url,price) VALUES ('tea',' black tea ',1,8,'/images/tea.jpg',299);
INSERT INTO items (name,description,cal,category_id,url,price) VALUES ('coffee','coffee with milk ',31,8,'/images/coffee.jpg',345);



-- INSERT INTO orders (user_id,time,estimated_time,completed_time,complete) VALUES (2,'13:30','00:15','14:15',TRUE);
-- INSERT INTO orders (user_id,time,estimated_time,completed_time,complete) VALUES (2,'12:30','00:30','01:01',TRUE);


