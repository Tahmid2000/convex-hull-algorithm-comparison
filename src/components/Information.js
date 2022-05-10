import React from "react";

const Information = () => {
  return (
    <div  style={{"width": "1300px", "margin": "auto"}}>
    <br />
      <hr />
      <h1 class="font-black text-2xl mt-3">Convex Hulls </h1>
      <p>
        A Convex Hull for a given set of points is defined as the smallest
        convex polygon that encloses all points of a set. More intuitively, we
        can imagine it to take the shape of a rubber band that wraps around a
        set of points if they were to stick out of the plane. Convex Hulls have
        numerous applications in a wide variety of fields. For instance, Convex
        Hulls may be used to determine collisions between objects. In order to
        model an object or obstacle defined by a set of points, we can use its
        convex hull. This could be used for planning the path of an object such
        as a car or a robot on a route in order to avoid crashes. In statistics,
        the convex hull is frequently used when a 2-dimensional sample space has
        to be represented in terms of area and not points. More specifically,
        the convex hull of a dataset without its outliers forms the loop of a
        bagplot, or a higher dimensional box-plot. In Computational Geometry,
        there are many other concepts that are tightly related to the Convex
        Hull. The Delaunay Triangulation can be seen as a projection of a Convex
        Hull of its points in one dimension higher, where each point has an
        additional coordinate corresponding to its magnitude. Consequently, the
        Voronoi Diagram is also related as it is the dual of the Delaunay
        Triangulation. These Computational Geometry concepts also come with
        their own large set of applications, making the Convex Hull an even more
        powerful tool.
      </p>
      <br />
      <hr />
      <h1 class="font-black text-red-700 text-2xl mt-3">Graham's Scan</h1>
      <p >
        {
          "Graham’s Scan is a sorting-based algorithm to find a convex hull for a set of points in a time complexity of O(n logn), where n is the input size. The algorithm’s runtime is not dependent on the output size, unlike Jarvis’s March and Chan’s Algorithm. The version of the algorithm that was implemented and that we will be discussing is the Andrew (‘79) version as introduced in class. The algorithm begins by sorting the points from left to right. We then build the upper hull and lower hull separately. For the upper chain, we add the leftmost point to the convex hull first, as we know that this point must belong to the hull. We then test points going from left to right through the sorted list of points, maintaining the convexity of the chain. We store chain vertices in a stack, adding them as we see them from left to right. We use a utility function, orient(p, q, r), which tells us if the turn formed by points p, q, and r is counterclockwise or clockwise. In other words, if orient(p, q, r) > 0, we have a left-hand turn; if we have orient(p, q, r) < 0, we have a right-hand turn; if orient(p, q, r) = 0, then there is no turn. "
        }
        <img src="./g1.png" alt=""/>
        {
          "We use this function to maintain our convexity of the chain, as we test our new point with the orient function. If orient(pi S[t], S[t-1]) results in a right hand turn, then S[t] must not belong to the upper chain, and we may pop it from the stack. If it is not a right hand turn, we can safely push pi onto the stack, setting S[t] to pi for the next iteration. Notice that this means that at the end of any iteration we only have left-hand turns, and thus by the end of it, we will have found the upper chain. Once we reach the rightmost point, the points belonging to the upper chain will be stored within the stack. To find the lower chain, we simply run the symmetric version of the algorithm by sorting the x-coordinates in descending order instead of ascending and concatenate the results found in both chains to form the final Convex Hull. Below is the basic pseudocode for find the upper-chain on a set of points, which can be modified to also find the lower-chain: "
        }
        {
          "We can show that this algorithm has a total runtime of O(n log n ) as follows: Step (1) takes O(n log n) to do the preprocessuing to sort all points by x-coordinate. Step (2) is a constant, or O(1) step, as it is not dependent on input size. Step (3) takes O(n), as we run through a maximum of n iterations each taking O(1) time for subparts (a) and (b). Thus, the dominating component of the runtime is n log n. "
        }
      </p>
      <br />
      <hr />
      
      <h1 class="font-black text-indigo-700 text-2xl mt-3">Jarvis's March</h1>
      <p>
        {
          "Jarvis’s March is another Convex Hull algorithm for a set points with a worst case time complexity of O(n2) where n is the number of points. We will be discussing the original algorithm which was implemented by Jarvis(‘73). The algorithm begins by choosing a point that must be on the convex hull. For all sets of points, the bottommost point is always on the hull. Thus, to find this point, we iterate through the set of points and find the point with the lowest y-coordinate. We add this point to the final point set V. From there, we can state that the last added point to the final set V is V[i-1] (as the algorithm progresses, this point won’t be the bottommost point). We can also state that the point added before V[i-1] is V[i-2]. In the case of V[i-1] being the bottommost point, or the first added point, we can make V[i-2] a placeholder point, such as (-inf,0). Note that this point is not part of the final convex hull. At every iteration i, we want to find the point vi which minimizes the turning angle of vi with respect to V[i-2] and V[i-1] for a point vi that doesn’t equal to V[i-1]. To do this we can use the utility function orient(p, q, r) discussed earlier which determines if points p, q, and r form a left-hand turn, right-hand turn, or no turn. At each iteration i, to find vi, we can use a series of orientation tests for each point p in the initial point set. Let point r equal to the current best point, initially this can be set as V[i-2]. For each point p, if orient(p, V[i-1], r) > 0, then point p creates a more minimal angle with respect to V[i-2] and V[i-1] than point r, so r can be set to p. After iterating through all points, we can set vi = r."
        }
        {
          "After finding the point vi which minimizes the turning angle of vi with respect to V[i-2] and V[i-1], we add it to V. This point is now V[i-1]. We continue this process till vi = V[1] (the first point) and then return V as the final convex hull. Attached below is the pseudocode for Jarvis’s March: "
        }
        {
          "Although previously stated that the worst case runtime of the algorithm is O(n2), a better representation for the Big O runtime complexity would be O(nh) where n is the number of points in the initial set and h is the number of final points in the convex hull. To find the bottommost point it takes O(n) time because we iterate through all the points. At each iteration of the algorithm, we perform orientation tests on all n points in the point set. An orientation test takes O(1) time, so for n points the runtime is O(n). The algorithm stops once vi = V[1] (the first point), meaning that the main part of the algorithm is run till i = h is achieved. Thus, we run h O(n) operations giving us the final runtime of O(nh). Unlike Graham’s Scan, this algorithm is output sensitive, meaning the runtime depends on the size of the final output. Although Jarvis’s March has a worse runtime complexity than Graham’s Scan, if h is small enough, Jarvis’s Scan can be more efficient."
        }
      </p>
      <br />
      <hr />
      <h1 class="font-black text-pink-700 text-2xl mt-3">Chan's Algorithm</h1>
      <p>
        {
          "The last Convex Hull algorithm we implemented is Chan’s algorithm, which is a combination of the Graham’s Scan and Jarvis’s March algorithms. We will discuss the original algorithm implemented by Chan(‘96). This algorithm takes the main concepts of each of the previous two algorithms and computes it on subsets of the initial point set. To avoid repetition, we will not discuss the specific details of Graham’s Scan and Jarvis’s March in this section. We start by guessing the value of h, the number of points in the final convex hull. For now, let h* equal to the guess for h. We will discuss later on how h* is derived. From there, we partition the initial point set into k subsets of size less than or equal to h*, where k = ceil(n/h*). It is important to note that one of the partitions might not have exactly h* points because k might not be divisible by h*. However, there should not be any partitions with more than h* points. After the partitioning, run the Graham’s Scan on each of these subsets. This will result in k mini-hulls. Note that the hulls might intersect because each during the partitioning, the subset picks the initial points randomly."
        }
        {
          "Moving on, we compute the final convex hull using some selection of the vertices of the mini-hulls. You can observe that any point that lies interior to a mini-hull will also lie interior of the final convex hull, so these points can be ignored. Similar to Jarvis’s March, we start by adding the bottommost point to the final convex hull and keeping a placeholder (-inf, 0). From there, when we are looking to add the next point to the final convex hull, where the last added point is vi-1, we simply have to find the point q on each of the k mini-hulls which creates a right tangent on that mini-hull with vi-1 because any other point would result in a bigger turning angle with respect to vi-1 and vi-2. Each convex hull will only have two tangents with respect to vi-1, but we only need the right one because it creates the minimum turning angle.  After finding q from each of the mini-hulls, we can determine vi to be the q that creates the minimum turning angle. To find each q, we can run a modified Jarvis’s March. In the initial Jarvis’s March, points were looked at iteratively to find the point q that minimizes the turning angle, however, since each convex hull is sorted in counter-clockwise order (from the Graham’s Scan), so the Jarvis’s March can be modified to find q using a binary search."
        }
        {
          "Using the modified Jarvis’s March, we keep adding points to the final convex hull till vi equals to the first point in the mini-hull or the number of points added to the final convex hull equals to h*. What if the guess for h was too low? In that case, the complete convex hull won’t be found and we return an empty final convex hull. Attached below is the pseudocode for Chan’s Algorithm: "
        }
        {"To get the correct h, we want to guess h* such that  h < h* ≤ (h*)2 to ensure an efficient running time for the algorithm. To do this, we can start with a small value for h* such as 4, and keep squaring h* till we get a value that returns a final convex hull using the above pseudocode. The pseudocode for this modification is attached below, which uses the “ConditionalHull” algorithm from above:"}
        {"Despite being a combination of the Graham’s Scan, which runs in O(n logn), and Jarvis’s March, which runs in O(nh), Chan’s algorithm has a better runtime complexity than both at O(n log h), where n is the number of points in the initial point set and h is the number of points in the final convex hull. For the discussion of the runtime, assume that h = h*, since h will be the biggest value for h*. Partitioning the initial point set takes O(n) time. Performing Graham’s Scan on each partition takes O(h logh) time because each mini-hull is at most size h. Since there are k subsets, the total runtime for the Graham’s Scan phase is O(k h logh), which simplifies to O(n log h). Finding the bottommost point takes O(n) time. To find each q, the point which creates the minimum turning angle with respect to the last two points in the convex hull, it takes O(k logh) time since we are running the binary search (O(logh)) time for k mini-hulls. If there are h points in the final convex hull, we run Jarvis’s March h times, giving a total runtime of O(h k logh), which simplifies to O(n log h). Adding the two phases together, we get a runtime complexity of O(n log h) for each h*, or the “ConditionalHull” part of the algorithm. The “ConditionalHull” is run a constant number of times, giving us a final runtime complexity of O(n log h). It has been proven by Kirkpatrick and Seidel(‘86) that it is impossible to find a convex hull with a better runtime."}
      </p>
      <br />
      <hr />
      <h1 class="font-black text-2xl mt-3">References</h1>
      <br />
      <ol type="1">
        <li>Dr. Kyle Fox's Lecture Notes</li>
        <li>David Mount's <a href="https://www.cs.umd.edu/class/fall2021/cmsc754/Lects/cmsc754-fall-2021-lects.pdf" rel="noreferrer" target="_blank" class="text-blue-500 font-bold">Lecture Notes</a></li>
      </ol>
      <br />
       <hr />
       <br />
      <p> Designed by <a href="https://www.linkedin.com/in/tahmidimran/" target="_blank" rel="noreferrer" class="text-green-500 font-bold">Tahmid</a> and <a href="https://www.linkedin.com/in/trent-haines-8bb3b2163/" target="_blank" rel="noreferrer" class="text-green-500 font-bold">Trent</a></p> 
      <br />
    </div>
  );
};
export default Information;
