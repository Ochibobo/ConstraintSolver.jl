var documenterSearchIndex = {"docs":
[{"location":"explanation.html#Explanation-1","page":"Explanation","title":"Explanation","text":"","category":"section"},{"location":"explanation.html#","page":"Explanation","title":"Explanation","text":"In this part I'll explain how the constraint solver works. You might want to read this either because you're just interested or because you might want to contribute to this project.","category":"page"},{"location":"explanation.html#","page":"Explanation","title":"Explanation","text":"This project evolved during a couple of months and is more or less fully documented on my blog: Constraint Solver Series.","category":"page"},{"location":"explanation.html#","page":"Explanation","title":"Explanation","text":"That is an ongoing project and there were a lot of changes especially at the beginning. Therefore here you can read just the current state in a shorter format.","category":"page"},{"location":"explanation.html#General-concept-1","page":"Explanation","title":"General concept","text":"","category":"section"},{"location":"explanation.html#","page":"Explanation","title":"Explanation","text":"The constraint solver works on a set of discrete bounded variables. In the solving process the first step is to go through all constraints and remove values which aren't possible i.e if we have a all_different([x,y]) constraint and x is fixed to 3 it can be removed from the possible set of values for y directly.","category":"page"},{"location":"explanation.html#","page":"Explanation","title":"Explanation","text":"Now that y changed this might lead to further improvements by calling constraints where y is involved. By improvement I mean that the search space gets smaller.","category":"page"},{"location":"explanation.html#","page":"Explanation","title":"Explanation","text":"After this step it might turn out that the problem is infeasible or solved but most of the time it's not yet known. That is when backtracking comes in to play.","category":"page"},{"location":"explanation.html#Backtracking-1","page":"Explanation","title":"Backtracking","text":"","category":"section"},{"location":"explanation.html#","page":"Explanation","title":"Explanation","text":"In backtracking we split the current model into several models in each of them we fix a variable to one particular value. This creates a tree structure. The constraint solver decides how to split the model into several parts. Most often it is useful to split it into a few parts rather than many parts. That means if we have two variables x and y and x has 3 possible values after the first step and y has 9 possible values we rather choose x to create three new branches in our tree than 9. This is useful as we get more information per solving step this way. ","category":"page"},{"location":"explanation.html#","page":"Explanation","title":"Explanation","text":"After we fix a value we go into one of the open nodes. An open node is a node in the tree which we didn't split yet (it's a leaf node) and is neither infeasible nor is a fixed solution. ","category":"page"},{"location":"explanation.html#","page":"Explanation","title":"Explanation","text":"There are two kind of problems which have a different backtracking strategy. One of them is a feasibility problem like solving sudokus and the other one is an optimization problem like graph coloring.","category":"page"},{"location":"explanation.html#","page":"Explanation","title":"Explanation","text":"In the first way we try one branch until we reach a leaf node and then backtrack until we prove that the problem is infeasible or stop when we found a feasible solution.","category":"page"},{"location":"explanation.html#","page":"Explanation","title":"Explanation","text":"For optimization problems a node is chosen which has the best bound (best possible objective) and if there are several ones the one with the highest depth is chosen.","category":"page"},{"location":"explanation.html#","page":"Explanation","title":"Explanation","text":"In general the solver saves what changed in each step to be able to update the current search space when jumping to a different open node in the tree.","category":"page"},{"location":"reference.html#Reference-1","page":"Reference","title":"Reference","text":"","category":"section"},{"location":"reference.html#User-interface-functions-1","page":"Reference","title":"User interface functions","text":"","category":"section"},{"location":"reference.html#","page":"Reference","title":"Reference","text":"ConstraintSolver.init\nadd_var!\nadd_constraint!\nset_objective!\nsolve!\nvalue","category":"page"},{"location":"reference.html#ConstraintSolver.init","page":"Reference","title":"ConstraintSolver.init","text":"init()\n\nInitialize the constraint model object\n\n\n\n\n\n","category":"function"},{"location":"reference.html#ConstraintSolver.add_var!","page":"Reference","title":"ConstraintSolver.add_var!","text":"add_var!(com::CS.CoM, from::Int, to::Int; fix=nothing)\n\nAdding a variable to the constraint model com. The variable is discrete and has the possible values from,..., to. If the variable should be fixed to something one can use the fix keyword i.e add_var!(com, 1, 9; fix=5)\n\n\n\n\n\n","category":"function"},{"location":"reference.html#ConstraintSolver.add_constraint!","page":"Reference","title":"ConstraintSolver.add_constraint!","text":"add_constraint!(com::CS.CoM, constraint::Constraint)\n\nAdd a constraint to the model i.e add_constraint!(com, a != b)\n\n\n\n\n\n","category":"function"},{"location":"reference.html#ConstraintSolver.set_objective!","page":"Reference","title":"ConstraintSolver.set_objective!","text":"set_objective!(com::CS.CoM, sense::Symbol, objective::ObjectiveFunction)\n\nSet the objective of the model. Sense can be :Min or :Max.\n\n\n\n\n\n","category":"function"},{"location":"reference.html#ConstraintSolver.solve!","page":"Reference","title":"ConstraintSolver.solve!","text":"solve!(com::CS.CoM; backtrack=true, max_bt_steps=typemax(Int64), keep_logs=false)\n\nSolve the constraint model if backtrack = true otherwise stop before calling backtracking. This way the search space can be inspected after the first pruning step. If max_bt_steps is set only that many backtracking steps are performed.  With keep_logs one is able to write the tree structure of the backtracking tree using ConstraintSolver.save_logs.\n\n\n\n\n\n","category":"function"},{"location":"reference.html#ConstraintSolver.value","page":"Reference","title":"ConstraintSolver.value","text":"value(v::CS.Variable)\n\nGet the value of the variable if it is fixed. Otherwise one of the possible values is returned. Can be used if the status is :Solved as then all variables are fixed.\n\n\n\n\n\n","category":"function"},{"location":"reference.html#Constraints-1","page":"Reference","title":"Constraints","text":"","category":"section"},{"location":"reference.html#","page":"Reference","title":"Reference","text":"These can be used as constraints for a model","category":"page"},{"location":"reference.html#","page":"Reference","title":"Reference","text":"ConstraintSolver.all_different(variables::Vector{ConstraintSolver.Variable})\nBase.:(==)(x::ConstraintSolver.LinearVariables, y::Int)\nBase.:(==)(x::ConstraintSolver.LinearVariables, y::ConstraintSolver.Variable)\nBase.:(==)(x::ConstraintSolver.LinearVariables, y::ConstraintSolver.LinearVariables)\nConstraintSolver.equal(variables::Vector{ConstraintSolver.Variable})\nBase.:(==)(x::ConstraintSolver.Variable, y::ConstraintSolver.Variable)\nBase.:!(bc::ConstraintSolver.BasicConstraint)","category":"page"},{"location":"reference.html#ConstraintSolver.all_different-Tuple{Array{ConstraintSolver.Variable,1}}","page":"Reference","title":"ConstraintSolver.all_different","text":"all_different(variables::Vector{Variable})\n\nCreate a BasicConstraint which will later be used by all_different(com, constraint). \n\nCan be used i.e by add_constraint!(com, CS.all_different(variables)).\n\n\n\n\n\n","category":"method"},{"location":"reference.html#Base.:==-Tuple{ConstraintSolver.LinearVariables,Int64}","page":"Reference","title":"Base.:==","text":"Base.:(==)(x::LinearVariables, y::Int)\n\nCreate a linear constraint with LinearVariables and an integer rhs y. \n\nCan be used i.e by add_constraint!(com, x+y = 2).\n\n\n\n\n\n","category":"method"},{"location":"reference.html#Base.:==-Tuple{ConstraintSolver.LinearVariables,ConstraintSolver.Variable}","page":"Reference","title":"Base.:==","text":"Base.:(==)(x::LinearVariables, y::Variable)\n\nCreate a linear constraint with LinearVariables and a variable rhs y. \n\nCan be used i.e by add_constraint!(com, x+y = z).\n\n\n\n\n\n","category":"method"},{"location":"reference.html#Base.:==-Tuple{ConstraintSolver.LinearVariables,ConstraintSolver.LinearVariables}","page":"Reference","title":"Base.:==","text":"Base.:(==)(x::LinearVariables, y::LinearVariables)\n\nCreate a linear constraint with LinearVariables on the left and right hand side. \n\nCan be used i.e by add_constraint!(com, x+y = a+b).\n\n\n\n\n\n","category":"method"},{"location":"reference.html#ConstraintSolver.equal-Tuple{Array{ConstraintSolver.Variable,1}}","page":"Reference","title":"ConstraintSolver.equal","text":"equal(variables::Vector{Variable})\n\nCreate a BasicConstraint which will later be used by equal(com, constraint) \n\nCan be used i.e by add_constraint!(com, CS.equal([x,y,z]).\n\n\n\n\n\n","category":"method"},{"location":"reference.html#Base.:==-Tuple{ConstraintSolver.Variable,ConstraintSolver.Variable}","page":"Reference","title":"Base.:==","text":"Base.:(==)(x::Variable, y::Variable)\n\nCreate a BasicConstraint which will later be used by equal(com, constraint) \n\nCan be used i.e by add_constraint!(com, x == y).\n\n\n\n\n\n","category":"method"},{"location":"reference.html#Base.:!-Tuple{ConstraintSolver.BasicConstraint}","page":"Reference","title":"Base.:!","text":"Base.:!(bc::CS.BasicConstraint)\n\nChange the BasicConstraint to describe the opposite of it. Only works with a equal basic constraint. \n\nCan be used i.e by add_constraint!(com, x != y).\n\n\n\n\n\n","category":"method"},{"location":"reference.html#Objective-functions-1","page":"Reference","title":"Objective functions","text":"","category":"section"},{"location":"reference.html#","page":"Reference","title":"Reference","text":"ConstraintSolver.vars_max(vars::Vector{ConstraintSolver.Variable})","category":"page"},{"location":"reference.html#ConstraintSolver.vars_max-Tuple{Array{ConstraintSolver.Variable,1}}","page":"Reference","title":"ConstraintSolver.vars_max","text":"vars_max(vars::Vector{CS.Variable})\n\nCreate an objective which computes the maximum value a variable has if all are fixed otherwise depends on whether the objective sense is set to :Min or :Max. \n\nCan be used i.e by set_objective!(com, :Min, CS.vars_max([x,y]).\n\n\n\n\n\n","category":"method"},{"location":"index.html#ConstraintSolver.jl-1","page":"Home","title":"ConstraintSolver.jl","text":"","category":"section"},{"location":"index.html#","page":"Home","title":"Home","text":"Thanks for checking out the documentation of this constraint solver. The documentation is written in four different sections based on this post about how to write documentation.","category":"page"},{"location":"index.html#","page":"Home","title":"Home","text":"If you want to get a quick overview and just have a look at examples check out the tutorial.\nYou just have some How to questions? -> How to guide\nYou want to understand how it works deep down? Maybe improve it ;) -> Explanation\nGimme the code documentation directly! The reference section got you covered.","category":"page"},{"location":"index.html#","page":"Home","title":"Home","text":"If you have some questions please feel free to ask me by making an issue.","category":"page"},{"location":"index.html#","page":"Home","title":"Home","text":"You might be interested in the process of how I coded this: Checkout the full process on my blog opensourc.es.","category":"page"},{"location":"how_to.html#How-To-Guide-1","page":"How-To","title":"How-To Guide","text":"","category":"section"},{"location":"how_to.html#","page":"How-To","title":"How-To","text":"It seems like you have some specific questions about how to use the constraint solver.","category":"page"},{"location":"how_to.html#How-to-create-a-simple-model?-1","page":"How-To","title":"How to create a simple model?","text":"","category":"section"},{"location":"how_to.html#","page":"How-To","title":"How-To","text":"using ConstraintSolver\nCS = ConstraintSolver\n\ncom = CS.init()\n\nx = add_var!(com, 1, 9)\ny = add_var!(com, 1, 5)\n\nadd_constraint!(com, x + y == 14)\n\nstatus = solve!(com)","category":"page"},{"location":"how_to.html#How-to-add-a-uniqueness/all_different-constraint?-1","page":"How-To","title":"How to add a uniqueness/all_different constraint?","text":"","category":"section"},{"location":"how_to.html#","page":"How-To","title":"How-To","text":"If you want that the values are all different for some variables you can use:","category":"page"},{"location":"how_to.html#","page":"How-To","title":"How-To","text":"add_constraint!(com, CS.all_different(vars))","category":"page"},{"location":"how_to.html#","page":"How-To","title":"How-To","text":"where vars is an array of variables of the constraint solver i.e [x,y].","category":"page"},{"location":"how_to.html#How-to-add-an-optimization-function-/-objective?-1","page":"How-To","title":"How to add an optimization function / objective?","text":"","category":"section"},{"location":"how_to.html#","page":"How-To","title":"How-To","text":"Besides specifying the model you need to specify whether it's a minimization :Min or maximization :Max objective.","category":"page"},{"location":"how_to.html#","page":"How-To","title":"How-To","text":"set_objective!(com, :Min, CS.vars_max(vars))","category":"page"},{"location":"how_to.html#","page":"How-To","title":"How-To","text":"Currently the only objective is CS.vars_max(vars) which represents the maximum value of all variables. ","category":"page"},{"location":"how_to.html#","page":"How-To","title":"How-To","text":"More will come in the future ;)","category":"page"},{"location":"how_to.html#How-to-get-the-solution?-1","page":"How-To","title":"How to get the solution?","text":"","category":"section"},{"location":"how_to.html#","page":"How-To","title":"How-To","text":"If you define your variables x,y like shown in the simple model example you can get the value after solving with:","category":"page"},{"location":"how_to.html#","page":"How-To","title":"How-To","text":"val_x = value(x)\nval_y = value(y)","category":"page"},{"location":"how_to.html#How-to-get-the-state-before-backtracking?-1","page":"How-To","title":"How to get the state before backtracking?","text":"","category":"section"},{"location":"how_to.html#","page":"How-To","title":"How-To","text":"For the explanation of the question look here.","category":"page"},{"location":"how_to.html#","page":"How-To","title":"How-To","text":"Instead of solving the model directly you can have a look at the state before backtracking with:","category":"page"},{"location":"how_to.html#","page":"How-To","title":"How-To","text":"status = solve!(com; backtrack=false)","category":"page"},{"location":"how_to.html#","page":"How-To","title":"How-To","text":"and then check the variables using CS.values(x) or CS.values(y) this returns an array of possible values.","category":"page"},{"location":"tutorial.html#Tutorial-1","page":"Tutorial","title":"Tutorial","text":"","category":"section"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"This is a series of tutorials to solve basic problems using the constraint solver.","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"Before we tackle some problems we first have to install the constraint solver.","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"$ julia\n] add https://github.com/Wikunia/ConstraintSolver.jl","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"The package is currently not an official package which is the reason why we need to specify the url here.","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"Then we have to use the package with:","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"using ConstraintSolver\nCS = ConstraintSolver","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"Solving:","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"Sudoku\nGraph coloring","category":"page"},{"location":"tutorial.html#Sudoku-1","page":"Tutorial","title":"Sudoku","text":"","category":"section"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"Everybody knows sudokus and for some it might be fun to solve them by hand. Today we want to use this constraint solver to let the computer do the hard work.","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"Rules of sudoku:     - We have 9x9 grid each cell contains a digit or is empty initially     - We have nine 3x3 blocks      - In the end we want to fill the grid such that       - Each row, column and block should have the digits 1-9 exactly once","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"We now have to translate this into code:","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"Defining the grid:","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"grid = [6 0 2 0 5 0 0 0 0;\n        0 0 0 0 0 3 0 4 0;\n        0 0 0 0 0 0 0 0 0;\n        4 3 0 0 0 8 0 0 0;\n        0 1 0 0 0 0 2 0 0;\n        0 0 0 0 0 0 7 0 0;\n        5 0 0 2 7 0 0 0 0;\n        0 0 0 0 0 0 0 8 1;\n        0 0 0 6 0 0 0 0 0]","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"0 represents an empty cell. Then we need a variable for each cell:","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"com = CS.init() # creating a constraint solver model\ncom_grid = Array{CS.Variable, 2}(undef, 9, 9)\nfor (ind,val) in enumerate(grid)\n    if val == 0\n        com_grid[ind] = add_var!(com, 1, 9)\n    else\n        com_grid[ind] = add_var!(com, 1, 9; fix=val)\n    end\nend","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"For the empty cell we create a variable with possible values 1-9 and otherwise we do the same but fix the value to the given cell value.","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"Then we define the constraints:","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"for rc=1:9\n    #row\n    variables = com_grid[CartesianIndices((rc:rc,1:9))]\n    add_constraint!(com, CS.all_different([variables...]))\n    #col\n    variables = com_grid[CartesianIndices((1:9,rc:rc))]\n    add_constraint!(com, CS.all_different([variables...]))\nend","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"For each row and column (1-9) we extract the variables from com_grid and create an all_different constraint which specifies that all the variables should have a different value in the end. As there are always nine variables and nine digits we have an exactly once constraint as we want given the rules of sudoku.","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"The variables have to be one dimensional so we use ... at the end to flatten the 2D array.","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"Adding the constraints for the 3x3 blocks:","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"for br=0:2\n    for bc=0:2\n        variables = com_grid[CartesianIndices((br*3+1:(br+1)*3,bc*3+1:(bc+1)*3))]\n        add_constraint!(com, CS.all_different([variables...]))\n    end\nend","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"Then we call the solve function with the com model as the only parameter.","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"status = solve!(com)","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"This returns a status :Solved or :Infeasible if there is no solution.","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"In our case it returns :Solved. If we want to get the solved sudoku we can use:","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"println(com_grid)","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"which outputs:","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"6 9 3 4 8 2 5 7 1 \n8 5 7 3 1 9 6 2 4 \n2 1 4 7 6 5 8 9 3 \n1 7 8 5 9 4 2 3 6 \n5 6 9 2 3 1 7 4 8 \n4 3 2 8 7 6 1 5 9 \n3 8 1 9 2 7 4 6 5 \n7 4 6 1 5 3 9 8 2 \n9 2 5 6 4 8 3 1 7 ","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"If you want to get a single value you can i.e use value(com_grid[1]).","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"In the next part you'll learn a different constraint type and how to include an optimization function.","category":"page"},{"location":"tutorial.html#Graph-coloring-1","page":"Tutorial","title":"Graph coloring","text":"","category":"section"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"The goal is to color a graph in such a way that neighboring nodes have a different color. This can also be used to color a map.","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"We want to find the coloring which uses the least amount of colors.","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"com = CS.init()\n\ngermany = add_var!(com, 1, 10)\nfrance = add_var!(com, 1, 10)\nspain = add_var!(com, 1, 10)\nswitzerland = add_var!(com, 1, 10)\nitaly = add_var!(com, 1, 10)\n\ncountries = [germany, switzerland, france, italy, spain];","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"I know this is only a small example but you can easily extend it. In the above case we assume that we don't need more than 10 colors.","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"Adding the constraints:","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"add_constraint!(com, germany != france)\nadd_constraint!(com, germany != switzerland)\nadd_constraint!(com, france != spain)\nadd_constraint!(com, france != switzerland)\nadd_constraint!(com, france != italy)\nadd_constraint!(com, switzerland != italy)","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"If we call status = solve!(com) now we probably don't get a coloring with the least amount of colors.","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"We can get this using:","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"set_objective!(com, :Min, CS.vars_max(countries))\nstatus = solve!(com)","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"We can get the value for each variable using value(germany) for example or as before print the values:","category":"page"},{"location":"tutorial.html#","page":"Tutorial","title":"Tutorial","text":"println(countries)","category":"page"}]
}
