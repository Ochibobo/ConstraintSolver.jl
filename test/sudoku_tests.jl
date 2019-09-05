@testset "Sudoku" begin

@testset "Sudoku from opensourc.es" begin
    com = CS.init()

    grid = zeros(Int8, (9,9))
    grid[1,:] = [0,2,1,0,7,9,0,8,5]
    grid[2,:] = [0,4,5,3,1,0,0,0,9]
    grid[3,:] = [0,7,0,0,4,0,0,1,0]
    grid[4,:] = [0,0,0,1,0,8,0,3,6]
    grid[5,:] = [0,6,0,0,0,0,2,0,8]
    grid[6,:] = [0,0,0,0,0,3,0,0,4]
    grid[7,:] = [6,0,8,0,0,0,0,0,0]
    grid[8,:] = [0,9,4,0,0,7,8,0,0]
    grid[9,:] = [2,0,0,5,0,0,0,4,0]

    add_sudoku_constr!(com, grid)

    @test CS.solve(com) == :Solved
    @test fulfills_sudoku_constr(com)
end

@testset "Hard sudoku" begin
    com = CS.init()

    grid = zeros(Int8,(9,9))
    grid[1,:] = [0 0 0 5 4 6 0 0 9]
    grid[2,:] = [0 2 0 0 0 0 0 0 7]
    grid[3,:] = [0 0 3 9 0 0 0 0 4]
    grid[4,:] = [9 0 5 0 0 0 0 7 0]
    grid[5,:] = [7 0 0 0 0 0 0 2 0]
    grid[6,:] = [0 0 0 0 9 3 0 0 0]
    grid[7,:] = [0 5 6 0 0 8 0 0 0]
    grid[8,:] = [0 1 0 0 3 9 0 0 0]
    grid[9,:] = [0 0 0 0 0 0 8 0 6]

    add_sudoku_constr!(com, grid)

    @test CS.solve(com) == :Solved
    @test fulfills_sudoku_constr(com)
end

@testset "Hard fsudoku repo" begin
    com = CS.init()

    grid = zeros(Int8,(9,9))
    grid[1,:] = [0 0 0 0 0 0 0 0 0]
    grid[2,:] = [0 1 0 6 2 0 0 9 0]
    grid[3,:] = [0 0 2 0 0 9 3 1 0]
    grid[4,:] = [0 0 4 0 0 6 0 8 0]
    grid[5,:] = [0 0 8 7 0 2 1 0 0]
    grid[6,:] = [0 3 0 8 0 0 5 0 0]
    grid[7,:] = [0 6 9 1 0 0 4 0 0]
    grid[8,:] = [0 8 0 0 7 3 0 5 0]
    grid[9,:] = [0 0 0 0 0 0 0 0 0]

    add_sudoku_constr!(com, grid)

    @test CS.solve(com) == :Solved
    @test fulfills_sudoku_constr(com)
end
end